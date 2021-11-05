FROM node:14 as base
WORKDIR /app

USER root

COPY ./package.json .
COPY ./yarn.lock .
COPY . /app

RUN yarn install

FROM base as dev

RUN yarn prebuild
RUN yarn run build

FROM base as prod

COPY --from=dev --chown=node:node /app/dist/ /app/dist/
RUN rm -rf src/ &&\
    rm -rf node_modules/ &&\
    rm -rf test/ &&\
    yarn install --production &&\
    yarn cache clean

CMD ["yarn", "run", "start:prod"]
