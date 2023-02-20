# Home Library Service

To launch an application docker + nest + postgresDb

Rename `.env.example` file to `.env`

```
docker-compose build
```

next step

```
docker-compose up
```

To stop an application

```
docker-compose stop
```
_________________________________________________________________

View built containers

```
docker images
```

View built images

```
docker images
```

View running containers

```
docker ps
```

View all containers

```
docker ps
```

Deleting an image

```
docker rmi <id_image>
```

Deleting an containers

```
docker rm <id_image>
```

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
