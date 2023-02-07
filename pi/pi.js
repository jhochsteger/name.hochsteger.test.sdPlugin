function connectElgatoStreamDeckSocket(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo) {
    streamDeckSocketPIInstance.createWebsocket(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo);
}

class StreamDeckSocketPI {
    subscribeToEvent(event, callback) {
        if (!this.observers[event]) {
            this.observers[event] = [];
        }

        this.observers[event].push(callback);
    }

    unsubscribeFromEvent(event, callback) {
        if (this.observers[event]) {
            this.observers[event] = this.observers[event].filter((observer) => observer !== callback);
        }

    }

    notifyObservers(event, jsonEvent) {
        if (this.observers[event]) {
            this.observers[event].forEach((observer) => observer.update(event, jsonEvent));
        }
    }

    createWebsocket(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo) {
        let that = this; // Just in case it is needed in websocket.onmessage
        this.websocket = new WebSocket("ws://localhost:" + inPort);
        this.websocket.onopen = function () {
            let json = {
                "event": inRegisterEvent,
                "uuid": inPropertyInspectorUUID
            }

            that.websocket.send(JSON.stringify(json));
        }

        this.websocket.onmessage = function (evt) {
            const jsonObj = JSON.parse(evt.data);
            const event = jsonObj["event"];
            that.notifyObservers(event, jsonObj);
        }
    }

    constructor() {
        this.observers = {};
    }

    sendEvent(json) {
        this.websocket.send(JSON.stringify(json));
    }
}

let streamDeckSocketPIInstance = new StreamDeckSocketPI();
