/* 
    Represents any kind of JSON based entity.
*/
export default class Entity {
    constructor(entityJson, id, name) {
        this.json = entityJson;
        // if id/name is not provided attempt to extract them
        this.id = id ? id : "some-id"
        this.name = name ? name : "some-name"
    }
}