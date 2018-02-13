# SendGRPC

## Installation

### Docker

You can run sendgrpc container with your docker-compose.yml file. Just add a new service:

```yml
  sendgrpc:
    image: dbarzdys/sendgrpc
    volumes: 
     - ./your-config-file.json:/etc/sendgrpc/sendgrpc.conf.json
     - ./your-service.proto:/etc/sendgrpc/protos/your-service.proto
    ports:
     - 8888:8888
```

Example of sendgrpc.conf.json file:

```json
{
    "servers": [
        {
            "name": "your-service-name",
            "protoPath": "protos/your-service.proto",
            "target": "http://your-service:80"
        }
    ]
}

```

### NPM

You can also install this tool using npm.

```bash
npm install -g sendgrpc
```

And then run:

```bash
sendgrpc -p [port] -c [config-file]
```

## Preview

![alt text][logo]

[logo]: https://github.com/dbarzdys/sendgrpc/raw/master/preview/sendgrpc-1.png "Preview image"