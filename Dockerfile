FROM node:lts-alpine3.12

WORKDIR /app

ARG PORT=80

ENV NODE_ENV=production
ENV PORT=${PORT}
ENV DEBUG=note-app:*

RUN wget -qO- https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY . ./
RUN pnpm i --production --unsafe-perm

EXPOSE ${PORT}

CMD ["/bin/sh", "-c", "pnpm migrate && pnpm start"]