# Jerni
A minimal blogging RESTful API

### 1. Prerequisites
- Docker
- Docker Compose

### 2. Set environment variables
Use a `.env` file or set variables in shell. Note: environment variables in shell will overwrite ones in `.env` file.

- `PORT`: the host machine's port that the server will be running in.
- `MONGODB_DBNAME`: the database name in MongoDB of the server.
- `MONGODB_DIR`: the host machine's MongoDB data directory.
- `REDIS_DB`: the database number in Redis of the server.
- `JWT_SECRET`: a secret string to be used by `jsonwebtoken`.

### 3. Build Docker image
Run `scripts/build.sh`, the server will be built to an image tagged `jerni-api:latest`.

Save the latest image to a tar file by running `docker save -o <tar file output path> jerni-api:latest`.

### 4. Run the server
Run `docker-compose up`.

Run `docker load -i <path to the tar file>` to load the server from a tar file to Docker first if it is given to run the server.

### 5. Stop the server
Run `docker-compose down`.
