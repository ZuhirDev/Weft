# 🛠️ Configuración del Proyecto en Local con Docker

## 1. Clonar el repositorio

- Primero, clona el repositorio del proyecto desde GitHub.

    ```bash
        git clone https://github.com/ZuhirDev/Weft.git
    ```
## 2. Construir el frontend

- Accede a la carpeta frontend y compila los archivos de React.

    ```bash
        npm install 
        npm run build
    ```

- Esto generará los archivos estáticos necesarios para que el frontend funcione correctamente dentro del contenedor.

## 3. Levantar los contenedores

- Ahora dirígete a la carpeta infrastructure, donde se encuentra el archivo docker-compose.yml.

    ```bash
        cd infrastructure
        docker-compose up --build -d
    ```

## 4. Migraciones y datos de prueba

- Una vez que los contenedores estén corriendo, entra al contenedor del backend.

    ```bash
        docker exec -it weft-backend bash
    ```

- Y dentro del contenedor ejecuta las migraciones y carga los datos iniciales en la base de datos, incluyendo los usuarios de prueba.

    ```bash
        php artisan migrate:fresh --seed

        php artisan jwt:secret
    ```

## 5. Acceder a la aplicación

Una vez todo esté en funcionamiento, puedes acceder a la aplicación desde tu navegador.

https://weft.atisoluciones.es

El proyecto está configurado para funcionar en el puerto 80.
