const entityResponseConfig = {
    fields : {
        name : 'name',
        id : 'id'
    },
    listConfig : [
        {
            title: "ID",
            dataKey : "id"
        },
        {
            title: "Name",
            dataKey : "name"
        }
    ]
}

export const ENTITY_CONFIG = {
    'dest-config' : {
        url : '/authoring/config/',
        ...entityResponseConfig
    }, 
    'server': {
        url : ''
    }, 
    'template': {
        url : ''
    }, 
    'credential': {
        url : ''
    }, 
    'source-connection': {
        url : ''
    }, 
    'base-connection': {
        url : ''
    }, 
    'target-connection': {
        url : ''
    }, 
    'flow': {
        url : ''
    }, 
    'order': {
        url : ''
    }
}