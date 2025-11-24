# Build Angular
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod

# Serve using Nginx
FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/micro-community-frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
