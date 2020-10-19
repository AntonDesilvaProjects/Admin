import { renderJsonView } from "./JsonView";

// an entity view consists of 3 things:
// id, name, and a json representation of the item
export const renderEntity = entity => {
    const json_view_id = `ace-editor-${Date.now()}`;
    const markup = `
        <div class="entity-display">     
            <div class="entity-summary">
                <dl>
                    <dt class="id">Id:</dt><dd>${entity.id}</dd>
                    <dt class="name">Name:</dt><dd>${entity.name}</dd>
                </dl>
            </div>
            <div class="json-display">
                <div id="${json_view_id}" class="json-content"></div>
                <div class="control">
                    <button>Copy</button>
                    <button>Download</button>
                </div>
            </div>
        </div>
    `;
    return {
        markup: markup,
        viewId: json_view_id
    };
}