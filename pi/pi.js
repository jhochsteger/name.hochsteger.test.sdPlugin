let streamDeckSocketPIInstance;

function connectElgatoStreamDeckSocket(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo) {
    streamDeckSocketPIInstance = new StreamDeckSocketPI(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo);
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

    constructor(inPort, inPropertyInspectorUUID, inRegisterEvent, inInfo, inActionInfo) {
        let that = this; // Just in case it is needed in websocket.onmessage
        this.websocket = new WebSocket("ws://localhost:" + inPort);
        console.log("Connecting to Stream Deck on port " + inPort);
        this.observers = {};
        websocket.onopen = function () {
            // WebSocket is connected, register the plugin
            let json = {
                "event": inRegisterEvent,
                "uuid": inPropertyInspectorUUID
            }

            websocket.send(JSON.stringify(json));
        }

        websocket.onmessage = function (evt) {
            const jsonObj = JSON.parse(evt.data);
            const event = jsonObj["event"];
            that.notifyObservers(event, jsonObj);
        }
    }

    sendEvent(json) {
        websocket.send(JSON.stringify(json));
    }
}
