export const removeAllChildren = (parent) => {
    while (parent && parent.firstChild) {
        parent.firstChild.remove()
    }
}

export const fireCustomEvent = (target, eventName, eventDetails) => {
    const customEvent = new CustomEvent(eventName, {
        detail: eventDetails
    });
    target.dispatchEvent(customEvent);
}