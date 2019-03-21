import firebase from './../../firebase';


firebase.database().ref('/beers').push(beer);

firebase.database().ref('/beers/' + id).remove();

firebase.database().ref('/beers/' + id).set(beer);

firebase.database().ref('/beers/' + id).orderByChild('value')