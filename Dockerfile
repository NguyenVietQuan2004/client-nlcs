# # Stage 1: Build the Next.js application
# FROM node:20-alpine3.19 AS builder

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # Stage 2: Serve the Next.js application with Nginx
# FROM nginx:1.27.0

# COPY --from=builder /usr/src/app/.next /usr/share/nginx/html/.next
# COPY --from=builder /usr/src/app/public /usr/share/nginx/html/public

# # Copy the Nginx configuration file
# COPY ./nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


FROM node:20-alpine3.19 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod -R 755 /app
RUN npm run build
CMD ["npm", "start"]