import json
import uuid
from typing import cast

from flask import request, jsonify, Flask

from tinydb import TinyDB, Query
from tinydb.operations import delete, set

# set up the server and serve the static webapp files from dist folder
app = Flask(__name__, static_url_path='', static_folder='dist')
app.config["DEBUG"] = True

# set up the database
db = TinyDB('admin_db.json')
appSettingsTable = db.table('app_settings')

# load the admin config file
ADMIN_CONFIG = json.load(open('admin_config.json'))


######################################################
################ Service Layer #######################
######################################################

def generateImsToken(apiKey, environment):
    """
        Call IMS for the apiKey and environment and get the bearer token
    """
    try:
        clientConfig = ADMIN_CONFIG['clientConfigs'][apiKey]
    except KeyError:
        return ""
    
    return "token-for-"

def addGeneratedDataToAppSetting(appSetting):
    appSetting["imsToken"] = generateImsToken(appSetting["apiKey"], appSetting["environment"])
    appSetting["azureConfig"] = {
        "clientId" : "id"
    }

    return appSetting

def createApplicationSetting(appSettingToCreate):
    '''
        Persist the application settings to the database and add any generated info to
        the setting
    '''
    # query the table and mark the existing default as false
    if appSettingToCreate['isDefault'] == True:
        appSetting = Query()
        appSettingsTable.update(set('isDefault', False), appSetting.isDefault == True)
    
    # generate id
    appSettingToCreate["id"] = str(uuid.uuid4())

    # store the new app setting
    id = appSettingsTable.insert(appSettingToCreate)
    createdAppSetting = appSettingsTable.get(doc_id = id)

    # including additional generated data to the app setting
    addGeneratedDataToAppSetting(createdAppSetting)
    
    return createdAppSetting

def listApplicationSettings():
    settings = appSettingsTable.all()
    for setting in settings:
        addGeneratedDataToAppSetting(setting)
    return settings

######################################################
############## REST Endpoint Layer ###################
######################################################

# application settings endpoint
@app.route('/settings', methods=['POST'])
def createAppSettingEndpoint():
    # return request.json['name']
    return jsonify(createApplicationSetting(request.json))

@app.route('/settings', methods=['GET'])
def listAppSettings():
    # return request.json['name']
    return jsonify(listApplicationSettings())

app.run()


"""
admin_config.json

{
    "clientConfigs": {
        "AepActivation": {
            "apiKey": "",
            "environments": {
                "int": {
                    "ims": {
                        "url": "",
                        "client-id": "",
                        "client-secret": ""
                    },
                    "azurekv": {}
                },
                "stage": {},
                "prod": {}
            }
        }
    }
}

payload

{
    "name" : "Stage",
    "environment" : "stage",
    "imsOrgId" : "abcdefg@AdobeOrg",
    "apiKey": "AepActivation",
    "sandboxName" : "prod",
    "sandboxId" : "12324",
    "isDefault": true
}

"""





        
