# web-push
This is a sample of Progressive Web Apps that notifies in accordance with the specification of [VAPID](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications#using_vapid).

## Getting Started

### Install tools
This project requires [Docker](https://docs.docker.com/engine/installation/#supported-platforms) and [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/).

### Create key pair
Create a key pair for application server from [Push Companion](https://web-push-codelab.glitch.me/).

![push_companion](./docs/push_companion.png)

### Minikube settings

Create a namespace:

```

cd app/
kubectl create -f namespace.yaml

```

Generate your self-signed certificate:

```

mkdir tls
cd tls/
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=web-push.minikube.test"

```

Create a secret for your self-signed certificate:

```

kubectl create secret tls web-push --key tls.key --cert tls.crt --namespace=samples-web-push

```

Create a persistent volume and a persistent volum claim:

```

cd ../
kubectl create -f pv.yaml
kubectl create -f pvc.yaml

```

Push a docker image of this app to docker registry on minikube:

```

eval $(minikube docker-env)
docker build -t web-push:0.1 .

```

Make sure that the image is pushed:

```

docker images

```

Create a service for nginx and an ingress for it:

```

minikube addons enable ingress
kubectl create -f web-push.yaml
kubectl create -f ingress.yaml

```

Make sure that an IP address is assigned:

```

kubectl describe ing/web-push -n samples-web-push

```

### DNS settings on Mac

Install the dnsmasq:

```

brew update
brew install dnsmasq

```

Setup dnsmasq.conf:

```

echo bind-interfaces > /usr/local/etc/dnsmasq.conf
echo listen-address=127.0.0.1 >> /usr/local/etc/dnsmasq.conf
echo address=/minikube.test/`minikube ip` >> /usr/local/etc/dnsmasq.conf

```

Setup DNS resolving:

```

sudo mkdir -p /etc/resolver/
sudo bash -c "echo 'nameserver 127.0.0.1' > /etc/resolver/minikube.test"

```

Start service:

```

dscacheutil -flushcache
sudo brew services start dnsmasq

```

### Access page
Run Google Chrome and access in the browser by navigating to [https://web-push.minikube.test](https://web-push.minikube.test).

```

/Applications/Google\ Chrome.app/Contents/MacOS/Googleta-dir=/Users/$USER/tmp --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://web-push.minikube.test

```

### Get subscriptions
After accessing the page, paste the public key created from the Push Companion into textarea of Server Public Key and click the subscribe button.
Subscriptions (Endpoint URL, Public Key, Auth) is shown on the page.

![screen_subscription](./docs/screen_subscription.png)

### Create config file
Create a config file (```notification/config.yaml```).

```yaml:web-push/notification/config.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: config
data:
  SERVER_PUBLIC_KEY: <SERVER_PUBLIC_KEY_FROM_PUSH_COMPANION>
  SERVER_PRIVATE_KEY: <SERVER_PRIVATE_KEY_FROM_PUSH_COMPANION>
  CLIENT_PUBLIC_KEY: <CLIENT_PUBLIC_KEY_FROM_WEB_PAGE>
  CLIENT_AUTH: <CLIENT_AUTH_FROM_WEB_PAGE>
  ENDPOINT: <CLIENT_ENDPOINT_FROM_WEB_PAGE>

```

### Notifiation

Push a docker image of notification server to docker registry on minikube:

```

cd notification/
eval $(minikube docker-env)
docker build -t notification-server:0.1 .

```

Make sure that the image is pushed:

```

docker images

```

Create a config:

```

kubectl create -f config.yaml

```

Create a pod:

```

kubectl create -f notification.yaml

```

Make sure that pod is created:

```

kubectl get pods -n samples-web-push

```

Notification is shown by runnning the following command:

```

kubectl exec -it notification-server /bin/sh -n samples-web-push
node index.js

```

![notification](./docs/notification.png)