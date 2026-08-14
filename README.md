# StreamShelf

A video hosting platform built to upload, store, and stream video content, and to work through what it actually takes to run a microservices app on real cloud infrastructure.

## 🧱 Tech Stack

* React (Vite)
* Node.js
* JWT (JSON Web Tokens)
* AWS S3
* AWS ECS Fargate
* AWS RDS (MySQL)
* AWS CloudFront + Application Load Balancer
* Docker

## 🎬 What It Does

* Upload videos and thumbnails, including large files via multipart upload
* Browse a grid of uploaded videos and watch them with an inline player
* Manage your own uploads from a profile page, including delete
* Authenticate and stay authenticated statelessly across all three services

## 🧩 The Three Services
StreamShelf is split into three independently containerized microservices rather than one monolith:

* **auth** (port 3001): user registration, login, and JWT issuance
* **upload** (port 3002): handles video and thumbnail uploads, generates S3 presigned URLs
* **stream** (port 3003): serves the video catalog and streams content

Splitting these up meant each service could be built, tested, and scaled independently, and it required thinking through service boundaries instead of letting everything share state.

## ☁️ Getting It Onto AWS
The stack started local with Docker Compose so the three services and MySQL could talk to each other in isolation, then moved to AWS ECS Fargate for deployment. Getting there wasn't just "docker push and go":

* **One ALB, path-based routing.** Instead of a load balancer per service, all three sit behind a single Application Load Balancer with path-based rules (`/auth/*`, `/upload/*`, `/stream/*`) routing to the right target group. Cheaper, and simpler to reason about.
* **Private subnets, NAT Gateway.** ECS tasks and RDS live in private subnets with no direct inbound internet access, reaching out through a NAT Gateway when they need it.
* **The CloudFront detour.** CloudFront originally handled HTTPS termination for everything. That caused mixed content errors once the frontend was serving over HTTPS but calling services over HTTP, fixed with CloudFront path-based behaviors. Then CloudFront's payload size limit started rejecting larger video uploads, so HTTPS termination was moved straight onto the ALB instead, using a custom domain (`api.vincent-wong.ca` on IONOS) and an ACM certificate. Uploads now bypass CloudFront entirely.
* **Debugging RDS from inside ECS.** Connecting ECS tasks to RDS meant working through security group and subnet config until traffic actually flowed, and turning on ECS Exec to shell directly into a running task and check connectivity instead of guessing.
* **Keeping the data honest.** Fixed a MySQL foreign key cascade issue so deleting a video also cleans up everything tied to it, instead of leaving orphaned rows behind.
* **Cost-aware infrastructure.** NAT Gateways, ALBs, and RDS all cost money sitting idle, so the environment isn't run 24/7. RDS gets stopped and the NAT Gateway, ALB, and its Elastic IP get deleted between sessions, then recreated before a demo.

## 🔐 Auth & Uploads
JWTs handle authentication statelessly across all three services, so no service needs to keep session state. Uploads don't pass through the backend at all; the upload service issues an S3 presigned URL, and the client uploads directly to the bucket, which keeps large files off the app servers entirely.

## 🐳 Running It With Docker

1. Clone the repository.
2. Email [vincentwong5609@gmail.com](mailto:vincentwong5609@gmail.com) to request the required `.env` files.
3. Install [Docker](https://www.docker.com/products/docker-desktop/) if you don't already have it.
4. Add the `.env` files to the appropriate service directories, then run:

```
docker compose up -d --build
```

This starts all three services along with the MySQL database.

## 💻 Running It for Local Development

1. Clone the repository.
2. Email [vincentwong5609@gmail.com](mailto:vincentwong5609@gmail.com) to request the required `.env` files.
3. `cd` into each service directory and run:

```
npm install
```

4. Start the frontend with:

```
npm run dev
```

5. Start each of the other services (auth, upload, stream) with:

```
npm run devStart
```

## 🌐 Want to See It Live?
Email [vincentwong5609@gmail.com](mailto:vincentwong5609@gmail.com) to request a live demo. The AWS deployment will be spun up and a link sent over.

## 🔎 Example API Endpoints

* Register: `POST /auth/register`
* Login: `POST /auth/login`
* Upload Video: `POST /upload/video` (Requires Authorization: Bearer `<JWT_TOKEN>`)
* Get Videos: `GET /stream/videos`
* Delete Video: `DELETE /stream/videos/:id` (Requires Authorization: Bearer `<JWT_TOKEN>`)

## 🎯 What's Next

* Video transcoding for adaptive streaming
* Comments and likes
* Search and filtering by category or tag
* CI/CD pipeline for automated deployments

## 📌 Why This Project Exists
Built to work through, end to end:

* Splitting an app into microservices with real boundaries, not just folders
* Deploying and actually operating that setup on AWS, including the parts that break
* Direct-to-S3 uploads with presigned URLs instead of routing large files through the backend
* Stateless authentication with JWT across multiple services
* Making deliberate cost tradeoffs instead of leaving infrastructure running unmanaged
