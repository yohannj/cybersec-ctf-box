FROM node:21.5.0-bullseye-slim

# Install packages
RUN apt-get update \
    && apt-get install -y supervisor \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Setup app
RUN mkdir -p /app

# Add application
WORKDIR /app
COPY app .

# Install dependencies
RUN yarn

# Setup superivsord
COPY config/supervisord.conf /etc/supervisord.conf

# Expose the port node-js is reachable on
EXPOSE 1337

# Start the node-js application
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
