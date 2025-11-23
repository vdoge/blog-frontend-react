FROM node:alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ARG VITE_MODE
RUN npm run buildJS -- --mode $VITE_MODE
# RUN npm run buildJS

FROM nginx:alpine AS nginx-server
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/certs /etc/nginx/certs
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]