FROM node:14-alpine

## Set the working directory and copy the source code
RUN mkdir --parent /tmp/frontend
WORKDIR /tmp/frontend

COPY --chown=node:node ./package.json /tmp/frontend/package.json
COPY --chown=node:node ./yarn.lock /tmp/frontend/yarn.lock
RUN yarn install

COPY --chown=node:node . /tmp/frontend/

EXPOSE 3000

CMD ["npm", "start"]