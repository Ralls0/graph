FROM node:14-alpine as builder

## Switch to an unprivileged user (avoids problems with npm)
USER node

## Set the working directory and copy the source code
RUN mkdir --parent /tmp/frontend
WORKDIR /tmp/frontend

COPY --chown=node:node ./package.json /tmp/frontend/package.json
COPY --chown=node:node ./yarn.lock /tmp/frontend/yarn.lock
RUN yarn install

COPY --chown=node:node . /tmp/frontend/
RUN yarn build

# Final image to export the service
FROM nginx:1.19

## Copy the different files
COPY --chown=nginx:nginx --from=builder /tmp/frontend/build /usr/share/nginx/html

## Add permissions for the nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid && \
    chmod -R 777 /var/log/nginx /var/cache/nginx/ && \
    chmod 644 /etc/nginx/*

ENTRYPOINT ["nginx", "-g", "daemon off;"]
