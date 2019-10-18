FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN yarn run build

FROM node:alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "8080", "-s", "."]