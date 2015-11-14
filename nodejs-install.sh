#!/bin/bash
mkdir /opt/nodejs
cd /opt/nodejs
wget http://nodejs.org/dist/v4.2.1/node-v4.2.1-linux-x64.tar.gz
tar xzvf node-v*
cd node-v*
ln -sf /opt/nodejs/node-v*/bin/node /usr/bin/node
ln -sf /opt/nodejs/node-v*/bin/npm /usr/bin/npm
npm config set prefix=/usr