FROM node:10
COPY . /instagras-commentaire-ws
WORKDIR /instagras-commentaire-ws
RUN npm install
EXPOSE 3000
CMD [ "node", "api.js" ]