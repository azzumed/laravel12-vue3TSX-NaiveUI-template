FROM php:8.4-fpm

ENV DEBIAN_FRONTEND="noninteractive"
ENV ENV=/root/.bashrc

# Устанавливаем зависимости
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    curl \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    supervisor

# Очищаем кэш
RUN apt-get clean

# Устанавливаем расширения PHP
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && docker-php-ext-install pdo_pgsql mbstring zip exif pcntl

# Загружаем актуальную версию Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ARG USER_UID
ARG USER_GID
ARG CONTAINER_USER
ARG ENTRYPOINT

# Чтобы $ENTRYPOINT был виден в команде ENTRYPOINT
ENV ENTRYPOINT=$ENTRYPOINT

ENV USER_UID=$USER_UID
ENV USER_GID=$USER_GID

RUN echo "ARGS: USER_UID: $USER_UID | USER_GID: $USER_GID | CONTAINER_USER: $CONTAINER_USER | ENTRYPOINT: $ENTRYPOINT"

COPY $ENTRYPOINT /usr/local/bin/
RUN chmod 0755 /usr/local/bin/*

RUN groupadd -g $USER_GID www
RUN useradd -u $USER_UID -ms /bin/bash -g www www

# Меняем пользователя
USER $CONTAINER_USER

WORKDIR /app

# В контейнере открываем 9000 порт и запускаем сервер php-fpm
EXPOSE 9000

ENTRYPOINT $ENTRYPOINT
