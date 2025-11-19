# Micro-Community Problem Reporting System

A full-stack platform for reporting community issues (garbage, streetlights, leaks, roads, noise) with map placement, image uploads (S3), status tracking, and admin workflows.

## Tech stack
- Backend: Java 17, Spring Boot 3, Spring Security (JWT), JPA, PostgreSQL, AWS S3
- Frontend: Angular 17, Angular Material, Google Maps
- DevOps: Docker, docker-compose, Kubernetes manifests

## Features
- Authentication: Register/Login, JWT, roles (USER/ADMIN)
- User: Submit issues with map pin + images, track status, view history, in-app notifications
- Admin: Dashboard, list/filter issues, update status with notes, assign department, map view
- Public: Resolved issues map and stats-ready endpoints
- Common: Validation, global error handling, pagination, logging, S3 storage

## Running locally

1. Clone repo and create `.env` from `devops/.env.example`:
   \`\`\`
   cp devops/.env.example devops/.env
   \`\`\`
   Fill in S3 credentials (you can use a local MinIO by setting `S3_ENDPOINT` and creds; bucket must exist).

2. Build and run with docker-compose:
   \`\`\`
   cd devops
   docker-compose --env-file .env up --build
   \`\`\`
   - Backend: http://localhost:8080
   - Frontend: http://localhost:4200

3. Seeded categories load automatically.

## Development without Docker
- Backend:
  - Set env vars or edit `application.yml`.
  - Run: `mvn spring-boot:run`.
- Frontend:
  - `npm install`
  - `ng serve`
  - Configure `environment.ts.apiBaseUrl` to `http://localhost:8080/api`.

## API overview
- POST `/api/auth/register` â€” register user
- POST `/api/auth/login` â€” login
- GET `/api/issues/categories` â€” list categories
- POST `/api/issues` (multipart with `payload` JSON + `images[]`) â€” create issue
- GET `/api/issues/me` â€” list my issues (paginated)
- GET `/api/issues/{id}` â€” get issue
- GET `/api/issues/{id}/history` â€” status history
- GET `/api/issues/admin` â€” list all (admin; filter by `status` or `categoryId`)
- PUT `/api/issues/{id}/status` â€” update status (admin)
- GET `/api/issues/public/resolved` â€” public resolved list

## Kubernetes
- Apply secrets and manifests:
  \`\`\`
  kubectl apply -f devops/k8s/secret.yaml
  kubectl apply -f devops/k8s/postgres-statefulset.yaml
  kubectl apply -f devops/k8s/backend-deployment.yaml
  kubectl apply -f devops/k8s/backend-service.yaml
  kubectl apply -f devops/k8s/frontend-deployment.yaml
  kubectl apply -f devops/k8s/frontend-service.yaml
  kubectl apply -f devops/k8s/ingress.yaml
  \`\`\`

## Notes
- JWT secret must be strong and kept in secrets.
- S3 bucket needs correct CORS and public-read or CloudFront distribution.
- You can swap Google Maps with Leaflet by replacing `@angular/google-maps` components.

## Architecture
- Angular SPA -> NGINX -> Backend API
- Backend: Spring controllers -> services -> repositories (PostgreSQL)
- S3 for image storage
- Notifications stored in DB and displayed in-app (extendable to email/websocket)
