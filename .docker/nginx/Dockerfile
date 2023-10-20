# Use the latest Nginx image as the base
FROM nginx:latest

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf
