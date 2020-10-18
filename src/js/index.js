import Entity from "../model/Entity";
import * as EntityView from "../view/EntityView";
import 'ace-builds';
import 'ace-builds/webpack-resolver';
import * as Utils from "../js/Utils";

//https://github.com/ajaxorg/ace/wiki/Configuring-Ace


document.querySelector('a').addEventListener('click', (e) => {
    
    e.preventDefault();
    const mainView = document.querySelector('main')
    
    Utils.removeAllChildren(mainView)
    
    // render the json view
    
    let entity = new Entity({ name : "Anton", job : { title : "SE"}}, 
    "123", 
    "Some Entity");
    
    const entityMarkup = EntityView.renderEntity(entity);
    
   mainView.insertAdjacentHTML('afterbegin', entityMarkup.markup);
    
    let editor = ace.edit(entityMarkup.viewId, {
      readOnly: true,
      showGutter: true,
      fontSize: "12px",
      mode: 'ace/mode/javascript'
    });
    editor.session.setValue(JSON.stringify(entity.json, null, 2))
});