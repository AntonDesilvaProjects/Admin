import { VIEW_ELEMENTS } from "../view/ViewConstants";

export default class EntityController {
    constructor() {
        // generate URL hash for the view
        VIEW_ELEMENTS.app_navigation.addEventListener('onEntityNavigationClick', (e) => {
            var url = new URL(window.location.origin);
            if (e.detail.entityType) {
                url.searchParams.set('nav-id', e.detail.entityType);
            }
            if (e.detail.entityId) {
                url.searchParams.set('entity-id', e.detail.entityId);
            }
            window.history.pushState({path: url.toString()}, '', url.toString());
        });
    }
}