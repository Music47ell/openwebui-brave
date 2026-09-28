FROM mcr.microsoft.com/playwright:v1.60.0-noble

USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        gnupg \
    && curl -fsSL https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg \
        -o /etc/apt/keyrings/brave-browser-archive-keyring.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main" \
        > /etc/apt/sources.list.d/brave-browser-release.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends brave-browser \
    && rm -rf /var/lib/apt/lists/*

USER pwuser

WORKDIR /home/pwuser

RUN npm install playwright@1.60.0

COPY server.js /home/pwuser/server.js

EXPOSE 3000

CMD ["node", "/home/pwuser/server.js"]
