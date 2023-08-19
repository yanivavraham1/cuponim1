import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../firebaseConfig'; // Adjust the path if necessary

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Example: Reading data from a specific location
var couponsRef = database.ref('stores');

couponsRef.once('value', function (snapshot) {
  var coupons = snapshot.val();
  console.log(coupons);
});