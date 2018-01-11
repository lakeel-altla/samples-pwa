'use strict';

const config = require('config');

const SERVER_PUBLIC_KEY = config.get('server.publicKey');
const SERVER_PRIVATE_KEY = config.get('server.privateKey');

const CLIENT_PUBLIC_KEY = config.get('client.publicKey');
const CLIENT_AUTH = config.get('client.auth');
const ENDPOINT = config.get('client.endpoint');

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:example.com@gmail.com',
    SERVER_PUBLIC_KEY,
    SERVER_PRIVATE_KEY
);

const pushSubscription = {
    endpoint: ENDPOINT,
    keys: {
        auth: CLIENT_AUTH,
        p256dh: CLIENT_PUBLIC_KEY
    }
};

const payload = JSON.stringify({
    title: `Push Notification Title`,
    body: 'Hello World!!',
    icon: 'https://kanatapple.github.io/service-worker/push/images/image.jpg',
});

webpush.sendNotification(pushSubscription, payload);