# Build Stage: Install dependencies
FROM node:23-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Production Stage: Minimized image
FROM node:23-alpine

WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/

RUN npm install --only=production

EXPOSE 8000

CMD ["node", "dist/server.js"]