FROM node:22.12.0 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:22.12.0-alpine

WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/build ./

CMD ["node", "index.js"]