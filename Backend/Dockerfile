FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libzip-dev \
    git \
    unzip \
    libicu-dev \
    libxslt-dev \
    curl \
    gnupg2 \
    lsb-release \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql intl bcmath opcache

RUN docker-php-ext-install pcntl

RUN docker-php-ext-configure pcntl --enable-pcntl

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN chown -R www-data:www-data storage bootstrap/cache && chmod -R 775 storage bootstrap/cache

CMD ["php-fpm"]