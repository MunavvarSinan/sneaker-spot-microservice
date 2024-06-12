# Sneaker Spot microservice

This project is an advanced iteration of a mobile application I previously developed called Sneaker Spot. Building on the original app, I have expanded it into a comprehensive, scalable e-commerce platform. The backend features a dedicated microservices architecture using Node.js, Express, MongoDB, Kafka, Docker, Prisma ORM, and Elasticsearch. I have completed the user authentication service with JWT for secure login, registration, and password management. The frontend is built with Next.js, Tailwind CSS, TypeScript, Context API, and RTK Query. Planned enhancements include a product catalog with Elasticsearch for advanced search, real-time inventory management, and order processing facilitated by Kafka for efficient inter-service communication.

[System Design and Architecture](https://whimsical.com/sneaker-spot-CA6GYUoSrRQyebmjQAzdRX)

![System Design and Architecture](https://res.cloudinary.com/dsqvtsyb0/image/upload/v1718218492/Screenshot_from_2024-06-13_00-24-38_k42m8t.png)

## Project Structure

### Backend

The backend is organized into individual microservices following clean architecture principles. Currently, only the `auth-service` is implemented.

```
backend/
└── services/
  └──
    ├── auth-service/ <-- Only service currently implemented
    │ └── src/
    │ ├── application/
    │ ├── domain/
    │ ├── infrastructure/
    │ ├── middleware/
    │ ├── presentation/
    │ ├── shared/
    │ └── index.ts
    ├── user-service/
    │ └── ...
    ├── product-service/
    │ └── ...
    ├── inventory-service/
    │ └── ...
    └── order-cart-service/
    └── ...
    ├── payment-service/
    │ └── ...
    ├── review-service/
    │ └── ...
    ├── api-gateway/
    │ └── ...
```

### Docker

The Docker folder contains configurations for containerizing the application and orchestrating services.

```
docker/
└── docker-compose.yml
└── docker-compose.db.yml
└── docker-compose.services.yml
```

### Frontend

The frontend is built with Next.js and Tailwind CSS, providing a dynamic and responsive user interface.

## How to start

The easiest way to run backend is to use `docker-compose`:

```
cd docker && docker-compose up --build
```

or

```
cd docker && docker-compose watch
```

And to run the frontend :

```
bun install && bun dev
```

## Contributing

Contributions are welcome! Please follow these guidelines:

- Fork the repository and clone it locally.
- Create a new branch for your feature or bug fix.
- Make your changes and ensure that the code passes all tests.
- Commit your changes with descriptive commit messages.
- Push your changes to your fork and submit a pull request.

## License

This project is licensed under the [MIT](https://github.com/MunavvarSinan/ecommerce-microservice/blob/main/LICENSE) License. You are free to use, modify, and distribute the code as per the terms of this license.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms.

## Do Not...

- Modify the code without proper testing.
- Introduce breaking changes without discussing with maintainers.
- Use offensive language or engage in disrespectful behavior in issue discussions or pull requests.
