# Deployment Guide

## Prerequisites

- Docker and Docker Compose installed on your machine.
- 4GB+ RAM available for Docker containers (Microservices architecture is resource-intensive).

## Deployment

1. **Navigate to the docker-compose directory:**

   ```bash
   cd backend/docker-compose/default
   ```

2. **Build and start the services:**

   ```bash
   docker-compose up --build -d
   ```

   This command will:
   - Build the Docker images for all microservices using the `akhil/` namespace.
   - Start the databases (MySQL).
   - Start RabbitMQ.
   - Start Keycloak.
   - Start Eureka Server.
   - Start all the microservices.
   - Start the Gateway Server.

3. **Verify the deployment:**

   - **Eureka Dashboard:** [http://localhost:8070](http://localhost:8070)
   - **Keycloak:** [http://localhost:7080](http://localhost:7080) (Admin credentials: admin/admin)
   - **Gateway:** [http://localhost:5000](http://localhost:5000)

## Frontend

The frontend directory appears to be incomplete in this repository. You will need to complete the React application setup before it can be deployed. Once completed, you can create a `Dockerfile` for it and add it to the `docker-compose.yml`.
