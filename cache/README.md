# cache
This is a sample of Progressive Web Apps that caches URL addressable resources such as HTML, CSS, JavaScript.

## Getting Started

### Install tools
This project requires [Docker](https://docs.docker.com/engine/installation/#supported-platforms) and [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/).

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
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=app-cache.minikube.test"

```

Create a secret for your self-signed certificate:

```

kubectl create secret tls app-cache --key tls.key --cert tls.crt --namespace=samples-app-cache

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
docker build -t app-cache:0.1 .

```

Make sure that the image is pushed:

```

doccker images

```

Create a service for nginx and an ingress for it:

```

minikube addons enable ingress
kubectl create -f app-cache.yaml
kubectl create -f ingress.yaml

```

Make sure that an IP address is assigned:

```

kubectl describe ing/app-cache -n samples-app-cache

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

Run Google Chrome and access in the browser by navigating to [https://app-cache.minikube.test](https://app-cache.minikube.test).

```

/Applications/Google\ Chrome.app/Contents/MacOS/Googleta-dir=/Users/$USER/tmp --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://app-cache.minikube.test

```

### Working offline
Access the page at [https://app-cache.minikube.test](https://app-cache.minikube.test).

![screen](./docs/screen.png)

Take your PC offline and reload the page again. The page is shown even if PC is offline.

![screen_offline](./docs/screen_offline.png)
