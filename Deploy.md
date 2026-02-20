# 🛠️ Local Project Setup using Docker

This guide outlines how to deploy and test the project using Docker. By containerizing the application and its dependencies, Docker streamlines the setup process and prevents cross-system conflicts.

## 1. Clone the repository

- Clone the project's source code to your local machine using Git. This downloads the codebase and allows you to work within the project directory.

    ```bash
    git clone https://github.com/ZuhirDev/Weft
    cd Weft
    ```

## 2. Configure environment variables

The `.env` file contains the configuration required for the application to run properly.

- Create your environment file by copying the provided example template.

    ```bash
    cp .env.example .env
    ```

## 3. Build the frontend

The frontend relies on JavaScript technologies, meaning you must install its dependencies and compile the code for production.

- Install the necessary frontend packages:
    
    ```bash
    cd Frontend
    npm install
    ```
- Next, build the production assets:

    ```bash
    npm run build
    ```

This generates the static files the server needs to render the interface.

## 4. Start the Docker containers

This step launches the containers for the database, web server, PHP, and other required services.

- Run Docker Compose to build and start the containers in detached mode:

    ```bash
    cd Infrastructure
    docker compose up -d --build
    ```

This spins up the entire project infrastructure.

## 5. Configure Laravel inside the container

To ensure Laravel runs correctly, you need to install its dependencies and set up the application.

- Access the Laravel container's shell:

    ```bash
    docker exec -it laravel bash
    ```
- Once inside, install the required PHP dependencies:
    
    ```bash
    composer install
    ```
- Next, generate the application and JWT authentication keys:
    
    ```bash
    php artisan key:generate
    php artisan jwt:secret
    ```
- Finally, run the migrations to create the database tables and seed the initial data:

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

    > **Note:** If you encounter any issues with migrations or data seeding, you can reset the database. The following command drops all tables and runs everything from scratch:

    ```bash
    php artisan migrate:fresh --seed
    ```

## 6. Restart the containers

- Restart the containers to ensure all services pick up the finalized backend configuration and run automatically.

    ```bash
    docker compose down
    ```

    ```bash
    docker compose up -d
    ```

## 7. Access the application

Once everything is up and running, you can access the application by opening your web browser and navigating to [http://localhost:85](http://localhost:85).

---

## Email Configuration Note

To test features that require email delivery such as email verification or password resets, you must properly configure the mail variables in your `.env` file. 

```env
MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=your_mail_host
MAIL_PORT=your_mail_port
MAIL_USERNAME=your_mail_username
MAIL_PASSWORD=your_mail_password
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

You can use Mailtrap, a free service that captures outbound emails for testing purposes without actually sending them. Simply create an account, grab your SMTP credentials, and update these variables to enable email functionality in your development environment.