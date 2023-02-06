function connectElgatoStreamDeckSocket(inPort, inPluginUUID, inRegisterEvent, inInfo) {

    streamDeckSocketInstance.createWebsocket(inPort, inPluginUUID, inRegisterEvent, inInfo);
}
class StreamDeckSocket {
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

    createWebsocket(inPort, inPluginUUID, inRegisterEvent, inInfo) {
        let that = this; // Just in case it is needed in websocket.onmessage
        this.websocket = new WebSocket("ws://localhost:" + inPort);
        this.websocket.onopen = function () {
            let json = {
                "event": inRegisterEvent,
                "uuid": inPluginUUID
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

let streamDeckSocketInstance = new StreamDeckSocket();
