import Entity from "../model/Entity";
import * as EntityView from "../view/EntityView";
import 'ace-builds';
import 'ace-builds/webpack-resolver';
import * as Utils from "../js/Utils";
import * as EntityListView from "../view/EntityListView";

//https://github.com/ajaxorg/ace/wiki/Configuring-Ace


document.querySelector('a').addEventListener('click', (e) => {
    
    e.preventDefault();
  
    const mainView = document.querySelector('main')
    Utils.removeAllChildren(mainView)
    
    // render the json view
  //   let entity = new Entity({ name : "Anton", job : { title : "SE"}}, 
  //   "123", 
  //   "Some Entity");
    
  //   const entityMarkup = EntityView.renderEntity(entity);
    
  //  mainView.insertAdjacentHTML('afterbegin', entityMarkup.markup);
    
  //   let editor = ace.edit(entityMarkup.viewId, {
  //     readOnly: true,
  //     showGutter: true,
  //     fontSize: "12px",
  //     mode: 'ace/mode/javascript'
  //   });
  //   editor.session.setValue(JSON.stringify(entity.json, null, 2));
  const markup = EntityListView.renderEntityList([
      {
        title: "ID",
        dataKey: "instance_id"
      },
      {
        title: "Description",
        dataKey: "description"
      }
    ], [{ instance_id : "aerg2342fefefehjjfh", description: "some random description"},
    { instance_id : "aerg2342fefefehjjfh", description: "some random description"},
    { instance_id : "aerg2342fefefehjjfh", description: "some random description"},
    { instance_id : "aerg2342fefefehjjfh", description: "some random description"}])
  mainView.insertAdjacentHTML('afterbegin', markup);
});


document.querySelector('footer label').addEventListener('click', (e) => {
  let modal = document.querySelector('.modal')
  modal.style.display = "block";
});

document.querySelector('.modal-content .close').addEventListener('click', (e) => {
  let modal = document.querySelector('.modal')
  modal.style.display = "none";
})

window.onclick = function(event) {
  let modal = document.querySelector('.modal')
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
