# Jerni
Test
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
- `SLUG_SYNC_INTERVAL`: time interval to sync slugs in ms.

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

### 6. Develop (without Docker)
Use a `.env.dev` file or set variables in shell.
```
NODE_ENV=development
PORT=<custom port>
MONGODB_URI=<local MongoDB URI>
MONGODB_DBNAME=<local database name>
REDIS_URI=<local Redis URI>
JWT_SECRET=<secret string>
JWT_TTL=<token's time to live>
SLUG_SYNC_INTERVAL=<slug syncing interval>
```
Run:
```
npm run dev
```
