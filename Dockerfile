FROM node:20.11.0-bullseye
WORKDIR /app
COPY . .
RUN npm install &&\
  npm run build
CMD ["npm", "run", "prod"]