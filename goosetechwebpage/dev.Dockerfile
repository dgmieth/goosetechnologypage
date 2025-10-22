FROM node:alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:alpine AS runtime

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 2025
USER node
CMD ["npm", "start"]

#docker build -t dgmieth/sitegoosetech_dev -f ./dev.Dockerfile .
#docker run -d -p 2025:2024 dgmieth/sitegoosetech_dev