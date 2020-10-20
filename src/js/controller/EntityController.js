import { config } from "ace-builds";
import { VIEW_ELEMENTS } from "../view/ViewConstants";
import { CUSTOM_EVENTS } from './EventConstants';
import { ENTITY_CONFIG } from '../config/EntityConfig';
import * as EntityListView from "../view/EntityListView";
import * as EntityView from "../view/EntityView";

export default class EntityController {
    constructor() {
        // generate URL hash for the view
        this.registerEventHandlers();
    }

    registerEventHandlers() {
        VIEW_ELEMENTS.app_navigation.addEventListener(CUSTOM_EVENTS.on_entity_nav_click, this.onEntityNavigationClick.bind(this));
    }

    onEntityNavigationClick(e) {
        VIEW_ELEMENTS.app_main.classList.remove('loading-mask');
        const navConfig = e.detail;
        // set the url params
        this.updateUrlSearchParams(navConfig);

        VIEW_ELEMENTS.app_main.classList.add('loading-mask');
        // make api call - if id is present, fetch entity; otherwise, fetch all the entities
        const isSingleEntityRequest = config.entityId ? true : false;
        const url = ENTITY_CONFIG[navConfig.entityType].url + (isSingleEntityRequest ? `/${config.entityId}` : '');
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then((json) => this.generateEntityView(isSingleEntityRequest, json))
        .catch(this.generateErrorView);
    }

    updateUrlSearchParams(config) {
        let url = new URL(window.location.origin);
        if (config.entityType) {
            url.searchParams.set('nav-id', config.entityType);
        }
        if (config.entityId) {
            url.searchParams.set('entity-id', config.entityId);
        }
        window.history.pushState({path: url.toString()}, '', url.toString());
    }

    generateEntityView(navId, response) {
        VIEW_ELEMENTS.app_main.classList.remove('loading-mask');
    }

    generateErrorView(error) {
        VIEW_ELEMENTS.app_main.classList.remove('loading-mask');
    }
}