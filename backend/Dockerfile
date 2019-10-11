FROM node:6.7.0

RUN curl -o- -L https://yarnpkg.com/install.sh | bash​
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV​
COPY . /usr/src/app

EXPOSE 80​

ENTRYPOINT ["sh", "./entrypoint.sh"]
CMD ["yarn", "run", "start"]