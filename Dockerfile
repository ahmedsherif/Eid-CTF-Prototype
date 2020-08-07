FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 3000
RUN useradd myapp
USER myapp
CMD [ "npm", "start" ]
