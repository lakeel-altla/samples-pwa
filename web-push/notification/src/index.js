const SERVER_PUBLIC_KEY = process.env.NOTIFICATION_SERVER_PUBLIC_KEY;
const SERVER_PRIVATE_KEY = process.env.NOTIFICATION_SERVER_PRIVATE_KEY;

const CLIENT_PUBLIC_KEY = process.env.NOTIFICATION_CLIENT_PUBLIC_KEY;
const CLIENT_AUTH = process.env.NOTIFICATION_CLIENT_AUTH;
const ENDPOINT = process.env.NOTIFICATION_ENDPOINT;

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