package deserialization101;

import java.io.IOException;
import java.util.stream.Collectors;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class RequestHandler extends AbstractHandler {

	private enum Method {
		POST,
		OPTIONS;
	}

	public RequestHandler() {}

	@Override
	public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
		response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		response.setHeader("Access-Control-Max-Age", "86400");

		if (Method.OPTIONS.name().equalsIgnoreCase(request.getMethod())) {
			baseRequest.setHandled(true);
			return;
		}

		if (!Method.POST.name().equalsIgnoreCase(request.getMethod())) {
			response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
			baseRequest.setHandled(true);
			return;
		}

		try {
			String body = request.getReader().lines().collect(Collectors.joining("\n"));
			switch (target) {
			case "/game1":
                response.setContentType("text/plain");
                response.getWriter().print(Game1.game1(body));
                response.setStatus(HttpServletResponse.SC_OK);
                baseRequest.setHandled(true);
				break;
			default:
				response.setStatus(HttpServletResponse.SC_NOT_FOUND);
				baseRequest.setHandled(true);
				break;
			}

		} catch (Exception e) {
			manageException(response, e);
		}

		baseRequest.setHandled(true);
	}


	private void manageException(HttpServletResponse response, Exception t) {
		System.out.println(t.getMessage());
		t.printStackTrace();
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
	}

}
