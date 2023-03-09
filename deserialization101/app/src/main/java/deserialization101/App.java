package deserialization101;

import org.eclipse.jetty.server.Server;

public class App {

    public static void main(String[] args) throws Exception {
        Server server = new Server(80);
        server.setHandler(new RequestHandler());

		server.start();
		server.join();
    }
}
