self.addEventListener('install', function (event) {
    console.log('The event "install" is starting.');
});

self.addEventListener('fetch', function (event) {
    console.log('The event "fetch" is starting.');
});

self.addEventListener('activate', function (event) {
    console.log('The event "activate" is starting.');
});

self.addEventListener('push', (event) => {
    console.info('The event "push" is starting.', event);

    const data = event.data.json();
    const title = data.title;
    const body = data.body;
    const icon = data.icon;

    event.waitUntil(
        self.registration
            .showNotification(title, {
                body: body,
                icon: icon,
                tag: 'push-notification-tag'
            })
    );
});

self.addEventListener('notificationclick', event => {
    console.info('The event "notificationclick" is starting.', event);

    event.notification.close();

    return event.waitUntil(
        console.log('User clicks notification.')
    );
}, false);
