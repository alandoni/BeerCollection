import firebase from 'firebase'; // Should not be used elsewhere in the project
import * as Expo from 'expo';

firebase.initializeApp(Expo.Constants.manifest.extra.firebase);

export default firebase;
