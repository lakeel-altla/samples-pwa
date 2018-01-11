self.addEventListener('install', function (event) {
    console.log('The event "install" is starting.');
});

self.addEventListener('fetch', function (event) {
    console.log('The event "fetch" is starting.');
});

self.addEventListener('activate', function (event) {
    console.log('The event "activate" is starting.');
});

self.addEventListener('sync', function (evt) {
    console.log('The event "sync" is starting.');

    if (evt.tag.startsWith('send-msg:')) {
        var id = evt.tag.substr(9)
        if (isNaN(id)) {
            return;
        }

        evt.waitUntil(sendMessageToServer(id));
    }
});

function sendMessageToServer(id) {
    var dbName = 'sampleDB';
    var STORE_NAME = 'messsage';

    var openReq = indexedDB.open(dbName);
    openReq.onsuccess = function (event) {
        var db = event.target.result;
        var trans = db.transaction(STORE_NAME, 'readonly');
        var store = trans.objectStore(STORE_NAME);
        var req = store.get(id);

        req.onsuccess = function (event) {
            var result = event.target.result;
            // {id : '1', name : 'test'}
            console.log(result);

            var message = result.message;

            // Send message to server.
        }
    }
}