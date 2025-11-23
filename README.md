# vDoge's Blog - Full Stack Web Application (Frontend)🏗️ 

> *TL;DR* - A production-grade full-stack blog web app built with **React**, **TypeScript**, **NodeJS**, **Express**, and **MongoDB**, featuring **JWT authentication**, **Dockerized deployment**, and **modular architecture**.

---

## Table of Contents📚

1. [Overview](#overview)
1. [Additional Documentation](#additional-documentation)
1. [Prerequisite Software](#prerequisite-software)
1. [Getting Started](#getting-started)
1. [Environment Variables](#environment-variables)
1. [Deployment](#deployment)
1. [License](#license)

---

## Overview🧩

This project is the **frontend section** of a full-stack Blog Web Application.

It is designed as a practical demonstration of end-to-end engineering capability, covering modern frontend development, backend API design, authentication, containerization, DevOps practices, testing, and architectural documentation.

The system aims to illustrate clean code structure, modular domain architecture with a clear separation of concerns across controllers, services, routes, validation, and infrastructure layers. It emphasizes type-safety, explicit API contracts, and production-ready Docker deployment.

It serves as a practical, realistic alternative to theoretical interview questions, offering a working demonstration of real-world implementation skills.

[See the corresponding backend project here.](https://github.com/vdoge/TheGame)

---

<a id="additional-documentation"></a>

## Additional Documentation🗂️

For documentation like architecture diagram, sequence diagram, API docs, full deployment instructions and roadmap. [See the backend repo.](https://github.com/vdoge/TheGame)


---

## Prerequisite Software📋

You will need:
- Git
- Docker

If running locally:
- NodeJS

---


## Getting Started🚀
###### 1. Clone repo
```bash
git clone https://github.com/vdoge/vdogs-blog-frontend.git
cd vdogs-blog-frontend
```

###### 2. Install dependencies
```bash
npm install
```

###### 3. Run

There are multiple run commands:
```bash
"dev"       runs live development web server
"local"     runs live development web server, with the .env.local-dev config
"build"     builds react static files with TypeScript
"buildJS"   builds react static files with JavaScript
"lint"      -
"preview"   servers statically built web app files
```

example:
```bash
npm run local
```

---

## Environment Variables🧾

Setup the environment variable `.env` files:

For Local, use file name `.env.local-dev`
For Development, use file name `.env.development`
For Production, use file name `.env.production`

> Note: .env.local is a reserved filename for the dotenv library and conflicts with .env.development
>So use .local-dev instead

example local env config:
```bash
# ====================
# ====== Local =======
# ====================

VITE_API_URL=http://localhost:3080 # when behind reverse proxy, set to ""
```
When running locally, both backend and frontend are running separately, the frontend must point to the backend. 

When deployed in the compose cluster, the backend sits behind the Nginx reverse proxy. Meaning the frontend and backend shared the same host URL. 

The benefits of setting behind the reverse proxy:
- shares the same URL which eliminates the need to configure CORS
- single SSL cert needed for both the frontend and backend

---

## Deployment🐳

### Build

Builds as docker image.

```bat
.\scripts\build.sh
```
> Note: this only builds the frontend Vite React App. You will need to also clone and build the backend Node Express  App. When you have both Images on your Docker VM, you can then run them with Docker Compose.
>
>The Docker Compose file exists in the backend code repo.


### Push

Pushes the image to the configured docker registry

```bat
.\scripts\push.sh
```

### Run
The Docker Compose files are in the backend repository.

---

## License📜

![[LICENSE.md]]