# [programmer-memes.dhguo.dev](https://programmer-memes.dhguo.dev/)

# Programmer Memes

Programmer Memes is a community board web app where users can share and discuss memes related to programming and computer science.

![Main screenshot or GIF](/assets/demo.gif)

## Table of Contents

- [programmer-memes.dhguo.dev](#programmermemesdhguodev)
- [Programmer Memes](#programmer-memes)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)

  
## Features

- **Community Board**: Users can upload memes in various file formats.
- **Authentication & Authorization**: Uses session-based authentication with password reset functionality via email.
- **Server-side Rendering**: The feed page benefits from server-side rendering, greatly enhancing SEO.
- **GraphQL API**: Ensures end-to-end type safety and efficient data access, eliminating over-fetching and under-fetching issues.
- **Responsive Design**: Optimized for both desktop and mobile.
- **DB & ORM**: Utilized TypeORM with PostgreSQL.


## Tech Stack

- **Frontend**: React, Next.js, Urql, react-hook-form, TailwindCSS.
- **Backend**: Node.js, Express, Apollo Server, Prisma.
- **Database**: PostgreSQL.
- **Deployment**: Vercel(frontend), DigitalOcean VPS(backend).

## Getting Started

```bash
git clone https://github.com/HaoyangGuo/rslash-programmermemes.git

cd rslash-programmermemes/server

yarn install

# Populate a .env file with your credentials, follow .env.example

yarn run dev
```

Then, for the frontend:

```bash
cd ../client

yarn install

yarn run dev
```



