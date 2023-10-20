# Use PHP 8.2 FPM as the base image
FROM php:8.2-fpm

# Set working directory
WORKDIR /app

# Install system dependencies and PHP extensions
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zlib1g-dev \
    libzip-dev \
    libicu-dev \
    g++ \
    nodejs \
    npm \
    libpq-dev \
    curl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-configure intl
RUN docker-php-ext-install -j$(nproc) intl
RUN docker-php-ext-install pdo_mysql \
    pdo_pgsql \
    zip \
    exif \
    pcntl
RUN pecl install redis
RUN docker-php-ext-enable redis
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the application code into the image
COPY ./app /app

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Run Composer install for Symfony
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install

# Install Node.js and yarn
RUN npm install -g yarn

# Optionally, check Node.js and npm versions
RUN node -v
RUN npm -v

EXPOSE 9000

# Command to run on container start
CMD ["php-fpm"]