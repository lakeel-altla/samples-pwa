self.addEventListener('install', function (event) {
    console.log('The event "install" is starting.');
});

self.addEventListener('fetch', function (event) {
    console.log('The event "fetch" is starting.');
});

self.addEventListener('activate', function (event) {
    console.log('The event "activate" is starting.');
});