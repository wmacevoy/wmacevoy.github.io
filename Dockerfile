FROM node:18

# Install Python and pip in non-interactive mode
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
      git \
      python3 \
      python3-pip \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm update -g npm

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

EXPOSE 3000
ENV PORT=3000
WORKDIR /app

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" npm run dev
