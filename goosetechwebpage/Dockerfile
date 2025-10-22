FROM node:alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm i --force
COPY . .
RUN npm run build

FROM node:alpine AS runtime

WORKDIR /app
COPY package*.json ./
RUN npm i --force --verbose --only=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 2025
USER node
CMD ["npm", "start"]

#docker build -t dgmieth/sitegoosetech_dev .
#docker run -d -p 2025:2025 dgmieth/sitegoosetech_dev
