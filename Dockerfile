FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 5005

CMD ["npm", "run", "insertEbData"]

# Curretly the below commands need to be run from inside the container
# CMD ["npm", "run", "insertVenues"]
# CMD ["npm", "run", "insertEvents"]