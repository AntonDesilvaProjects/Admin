export const removeAllChildren = (parent) => {
    while (parent && parent.firstChild) {
        parent.firstChild.remove()
    }
}