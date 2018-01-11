# sync
This is a sample of Progressive Web Apps with background sync feature.

## Getting Started
This project requires Docker. Install from [here](https://docs.docker.com/engine/installation/#supported-platforms).

### Access page
Run the following command.

```

$ docker-compose up --build -d

```

Access in the browser by navigating to ```http://localhost:5000```.

### Background sync
Access the page at ```http://localhost:5000```.

![screen](./docs/screen.png)

Take your PC offline and click the sync button. When take your PC online and see console of developer tools. A log ("The event "sync" is starting.") of sync is shown on console.

![background_sync](./docs/background_sync.png)