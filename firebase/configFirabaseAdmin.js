import { PROJECT_ID, PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_EMAIL, CLIENT_ID } from '../config.js';

let jsonData = {
    "type": "service_account",
    "project_id": "PROJECT_ID",
    "private_key_id": "PRIVATE_KEY_ID",
    "private_key": "PRIVATE_KEY",
    "client_email": "CLIENT_EMAIL",
    "client_id": "CLIENT_ID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapcom/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.crobot/v1/metadata/x5firebase-adminsdk-g4ebm%40test-firebase-a4d1d.igserviceaccount.com",
    "universe_domain": "googleapis.com"
}
            
let jsonString = JSON.stringify(jsonData);


jsonData = jsonString.replace(/PROJECT_ID/g, PROJECT_ID)
                   .replace(/PRIVATE_KEY_ID/g, PRIVATE_KEY_ID)
                   .replace(/PRIVATE_KEY/g, PRIVATE_KEY)
                   .replace(/CLIENT_EMAIL/g, CLIENT_EMAIL)
                   .replace(/CLIENT_ID/g, CLIENT_ID)

export const configAdminFirebase = JSON.parse(jsonData);



