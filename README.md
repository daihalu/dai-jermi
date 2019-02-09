# Jerni
A minimal blogging RESTful API

### 1. Prerequisites
- Docker
- Docker Compose

### 2. Set environment variables
Use a `.env` file or set variables in shell. Note: environment variables in shell will overwrite ones in `.env` file.

- `PORT`: the port number to expose the API.
- `MONGODB_DIR`: the path of a directory to store data in the host machine.
- `JWT_SECRET`: a secret string used to sign access tokens.
- `JWT_TTL`: time to live of access tokens ([zeit/ms](https://github.com/zeit/ms) time formats).

### 3. Build Docker image
Run:
```
scripts/build.sh
```
The server will be built to an image tagged `jerni-api:latest`.

To save the latest image to a tar file, run:
```
docker save -o <tar file output path> jerni-api:latest
```

### 4. Run the server
Run:
```
docker-compose up
```
To load the server from a tar file to Docker first if it is given to run the server, run:
```
docker load -i <path to the tar file>
```

### 5. Stop the server
Run:
```
docker-compose down
```
