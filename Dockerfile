FROM node:20-alpine

WORKDIR /app

COPY server/package.json server/yarn.lock ./server/
RUN cd server && yarn --frozen-lockfile

COPY client/package.json client/yarn.lock ./client/
RUN cd client && yarn --frozen-lockfile

COPY . .

ARG DB_FILE_NAME

RUN cd server && npx drizzle-kit push
RUN cd server && yarn build

RUN cd client && yarn build

EXPOSE 3000
EXPOSE 8080

WORKDIR /app/server

CMD ["yarn", "start"]
