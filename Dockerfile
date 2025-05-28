FROM node:18 as builder

WORKDIR /opt

COPY . .

RUN npm i
RUN npx nx run rentalcarsfe:build

FROM httpd
COPY --from=builder /opt/dist/rentalcarsfe/* /usr/local/apache2/htdocs/