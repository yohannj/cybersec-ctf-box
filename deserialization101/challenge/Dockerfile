FROM gradle:jdk11-alpine

# Setup app
RUN mkdir -p /app

# Add application
WORKDIR /app
COPY app .

# Compile
RUN gradle installDist

# Expose the port on which our app is reachable on
EXPOSE 80

# Start the application
CMD ["./build/install/app/bin/app"]
