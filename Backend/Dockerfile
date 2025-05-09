# Usar la imagen oficial de PHP con FPM
FROM php:8.3-fpm

# Dependencias necesarias para Laravel
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

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# CREAR USUARIO PARA EVITAR PROBLEMAS DE PERMISOS DENTRO DEL CONTENEDOR
RUN groupadd -g 1000 zelh392 && \
    useradd -u 1000 -g zelh392 -m zelh392

# Instalar Composer 
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
 
# Definir el directorio de trabajo
WORKDIR /var/www/html

USER zelh392

# Comando para iniciar PHP-FPM
CMD ["php-fpm"]

# para poststgres
#apt-get install -y libpq-dev
#docker-php-ext-install pdo pdo_pgsql pgsql
