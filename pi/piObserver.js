class PiObserver { // Copy this class for each action you have in your plugin
    update(event, jsonEvent) {
        switch (event) { // Don't forget there is ReceiveEvents
            case "the event you need": // TODO change this to the event you need
                // Do something with the event
                break;
            default:
                console.log("Unknown event: " + event);
                break;
        }
    }

    constructor() {
        streamDeckSocketPIInstance.subscribeToEvent("the event you need", this); // TODO change this to the event you need
    }
}
