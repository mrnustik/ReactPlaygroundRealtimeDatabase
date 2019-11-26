import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    db: app.database.Database;

    constructor() {
        if(app.apps.length == 0)
            app.initializeApp(config);

        this.db = app.database();
    }

    public getGroceryItemsReference() {
        return this.db.ref('grocery-items');
    }
}

export default Firebase;