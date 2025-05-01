# Laravel Docker NGINX

Este proyecto es una plantilla para configurar un entorno de desarrollo de Laravel utilizando Docker. Incluye configuraciones para Laravel, Nginx, MySQL y otras herramientas comunes.

## Configuración del Proyecto

### 1. Proyecto de Laravel

- Para el proyecto puedes: 

    - Crear un nuevo proyecto Laravel desde cero, utilizando:

    ```bash
    laravel new nombre-proyecto
    ```

    - Clonar el repositorio del proyecto a tu máquina local:

    ```bash
    git clone https://github.com/zelh392/Laravel-Docker-Nginx
    cd Laravel-Docker-Nginx
    ``` 

### 2. Crear la Red de docker

- Crea una red de Docker para que los contenedores puedan comunicarse entre sí

    ```bash
    docker network create nombre_de_tu_red
    ```

### 3. Configurar Docker Compose
- Revisa el archivo `.env` de la configuración de `composer` y asegúrate de que las variables de entorno estén configuradas correctamente. También revisa el archivo `default.conf` en la carpeta `nginx/` para asegurarte de que los nombres de los contenedores coincidan.

### 4. Levantar los Contenedores
- Levantar el contenedor de **MySQL**:
    - Navega a la carpeta `DB/` y ejecuta:

    ```bash
    docker-compose up -d
    ```
- Levantar el contenedor de **Laravel + Nginx**
    - Navega a la carpeta `laravel/` y ejecuta:
    
    ```bash
    docker-compose up --build -d
    ```
### 5. Acceder al Contenedor de Laravel
- Para acceder al contenedor de Laravel utiliza:

    ```bash
    docker exec -it laravel bash
    ```

### 6. Configurar el Archivo .env
- Dentro del contenedor de Laravel, copia el archivo .env.example a .env y configura las variables de entorno, especialmente las relacionadas con la base de datos:

    ```bash
    cp .env.example .env
    ```

### 7. Instalar Dependencias
- Dentro del contenedor de Laravel, instala las dependencias de Composer y NPM:

    ```bash
    composer install
    npm install
    npm run dev
    ```

### 8. Configurar Vite
- Para permitir que Vite sea accesible desde fuera del contenedor, modifica el archivo vite.config.js y añade la siguiente configuración:

    ```javascript
    export default defineConfig({
        server: {
            host: '0.0.0.0',
            hmr: {
                host: 'localhost',
            },
        },
    });
    ```

### 9. Ejecutar Migraciones

- Si tu proyecto incluye migraciones, ejecútalas para configurar la base de datos:

    ```bash
    php artisan migrate
    ```