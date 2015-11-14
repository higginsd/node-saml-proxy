FROM centos:7

RUN yum install -y \
    wget \
    tar \
    bzip2 \
    git

COPY ./nodejs-install.sh /tmp/

RUN chmod +x /tmp/nodejs-install.sh

RUN /tmp/nodejs-install.sh

RUN npm install nodemon -g --silent

RUN npm install node-inspector -g --silent

RUN mkdir /tmp/app

COPY ./src /tmp/app

WORKDIR /tmp/app

RUN npm install

EXPOSE 3000
CMD["node","/src/app.js"]
