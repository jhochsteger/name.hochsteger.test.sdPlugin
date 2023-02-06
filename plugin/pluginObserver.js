class PluginObserver { // Copy this class for each action you have in your plugin and add the new file to the plugin.html
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
        streamDeckSocketInstance.subscribeToEvent("the event you need", this); // TODO change this to the event you need
    }
}
