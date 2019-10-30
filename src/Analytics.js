
export var fireViewEndCustomEvent = function fireViewEndCustomEvent() {
    console.log("Firing Custom Event 'event-view-end'");
    var event = new CustomEvent('event-view-end');
    var obj = document.querySelector("#app");
    obj.dispatchEvent(event);
};

export var fireViewStartCustomEvent = function fireViewStartCustomEvent(data) {
    console.log("Firing Custom Event 'event-view-start'");
    var event = new CustomEvent('event-view-start', data);
    document.body.dispatchEvent(event);
};

export var fireActionTriggerCustomEvent = 
function fireActionTriggerCustomEvent(target, data) {
    console.log("Firing Custom Triggered Event");
    var event = new CustomEvent('event-action-trigger', data);
    var obj = target.dispatchEvent(event);
};
