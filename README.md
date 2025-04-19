# Inception

## Overview
This project involves setting up a small infrastructure composed of different services using Docker containers. It's designed to deepen understanding of system administration and containerization concepts.

## Project Structure
```
.
├── Makefile
└── srcs
    ├── docker-compose.yml
    ├── .env
    └── requirements
        ├── bonus
        │   ├── Redis
        │   ├── FTP
        │   ├── Porfolio
        │   ├── Adminer
        │   └── cAtvidor
        ├── mariadb
        │   ├── conf
        │   ├── Dockerfile
        │   └── tools
        ├── nginx
        │   ├── conf
        │   ├── Dockerfile
        │   └── tools
        ├── tools
        └── wordpress
            ├── conf
            ├── Dockerfile
            └── tools
```

## Mandatory Services
The infrastructure consists of three main services, each running in its own container:

1. **NGINX**: Acts as a web server with TLSv1.2/TLSv1.3 support
2. **WordPress + PHP-FPM**: Runs the WordPress application
3. **MariaDB**: Handles database operations

## Bonus Services
Additional services implemented for the bonus part:

1. **Redis Cache**: Provides caching for WordPress to improve performance
2. **FTP Server**: Allows FTP access to WordPress files
3. **Portfolio**: A simple static website 
4. **Adminer**: Database management interface
5. **cAtvisor**: cAdvisor (Container Advisor) is a monitoring tool developed by Google that provides resource usage and performance data about running containers

## Features
- Each service runs in a dedicated container
- Custom Dockerfiles for each service
- Docker network for inter-container communication
- Volumes for persistent data storage:
  - WordPress database volume
  - WordPress website files volume
  - Additional volumes for bonus services as needed
- TLS encryption via NGINX
- Environment variables for configuration



