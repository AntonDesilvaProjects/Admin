import { VIEW_ELEMENTS } from "../view/ViewConstants";
import { CUSTOM_EVENTS } from './EventConstants';
import * as Utils from "../Utils";

export default class ApplicationController {
    constructor() {
        // register event handlers
        this.initState();
        this.registerEventHandlers();
        

    }

    initState() {
        let eventMap = new Map();
        const entityNavIds = ['dest-config', 'server', 'template', 'credential', 'source-connection', 'base-connection', 'target-connection', 'flow', 'order'];
        entityNavIds.forEach(navId => eventMap.set(navId, CUSTOM_EVENTS.on_entity_nav_click));
        this.NAV_ID_TO_EVENT_MAP = eventMap;
    }
        

    registerEventHandlers() {
        VIEW_ELEMENTS.app_navigation.addEventListener('click', this.onNavigationClick.bind(this))

        window.onclick = function(event) {
            let modal = document.querySelector('.modal')
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }
    }

    onNavigationClick(e) {
        console.log(e);
        const targetClassList = e.target.classList;
        if (targetClassList.contains('nav-item')) {
            e.preventDefault(); //stop the page from reloading
            // set the active status to nav item
            const navId = e.target.getAttribute("data-nav-id");
            this.handleNavigation(navId);
        }
    }

    /*
        /{navId : 'dest-config', entityId: '1234', tab: 'pes'}
    */
   handleNavigation(navId, entityId) {
        // trigger event for appropriate controller to start populaing the view
        Utils.fireCustomEvent(VIEW_ELEMENTS.app_navigation, this.NAV_ID_TO_EVENT_MAP.get(navId), {
            entityType : navId,
            entityId: entityId 
        });
    }
}   