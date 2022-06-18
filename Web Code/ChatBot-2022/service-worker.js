'use strict';

self.addEventListener('message', function(event) {
    self.client = event.source;
});

self.onnotificationclick = function(event) {
    event.notification.close();
    if (clients.openWindow) {
        return clients.openWindow(event.notification.data);
    }
}