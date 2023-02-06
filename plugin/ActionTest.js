class ActionTest {
    update(event, jsonEvent) {
        switch (event) {
            case ReceiveEvents.keyDown:
                console.log("Received keyDown event: " + jsonEvent);
                break;
            default:
                console.log("Unknown event: " + event);
                break;
        }
    }

    constructor() {
        streamDeckSocketInstance.subscribeToEvent(ReceiveEvents.keyDown, this);
    }
}
