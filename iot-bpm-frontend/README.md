# IOT-BPM-Frontend

This application serves as the frontend of the IoT-BPM web-application.

## Deploy Application
```
az acr login -n acrbpmeventprocessingdev
docker build . -t acrbpmeventprocessingdev.azurecr.io/iot-bpm-frontend:dev-release-1.0.0
docker push acrbpmeventprocessingdev.azurecr.io/iot-bpm-frontend:dev-release-1.0.0
```