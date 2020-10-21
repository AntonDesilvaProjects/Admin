import { config } from "ace-builds";
import { VIEW_ELEMENTS } from "../view/ViewConstants";
import { CUSTOM_EVENTS } from './EventConstants';
import { ENTITY_CONFIG } from '../config/EntityConfig';
import * as EntityListView from "../view/EntityListView";
import * as EntityView from "../view/EntityView";
import * as Utils from "../Utils";

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
        const url = ENTITY_CONFIG[navConfig.entityType].url + (config.entityId || '');
        fetch(url, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(json => this.generateEntityView(config.entityType, config.entityId, json))
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

    generateEntityView(entityType, entityId, response) {
        Utils.removeAllChildren(VIEW_ELEMENTS.app_main); 
        const entityConfig = ENTITY_CONFIG[navConfig.entityType];   
        // if entity id is present, the load the single entity view
        if (entityId) {
            let entity = new Entity({ name : "Anton", job : { title : "SE"}}, entityId, "Some Entity");
            EntityView.renderEntity(VIEW_ELEMENTS.app_main, entity);
        } else {
            // otherwise, present the list view
            EntityListView.renderEntityList(VIEW_ELEMENTS.app_main, entityConfig.listConfig, {});
        }
        VIEW_ELEMENTS.app_main.classList.remove('loading-mask');
    }

    generateErrorView(error) {
        VIEW_ELEMENTS.app_main.classList.remove('loading-mask');
    }
}