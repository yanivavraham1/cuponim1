
const firebaseConfig = {
    apiKey: "AIzaSyB2GEnvujKR-O82ZLlzsn4cSLkm71ULbqU",
    authDomain: "cuponim-a4dce.firebaseapp.com",
    databaseURL: "https://cuponim-a4dce-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cuponim-a4dce",
    storageBucket: "cuponim-a4dce.appspot.com",
    messagingSenderId: "41324907539",
    appId: "1:41324907539:web:630e9bae0266e13f9103e6",
    measurementId: "G-64BWFLGVPS"
  };


  firebase.initializeApp(firebaseConfig);
  
  // Reference to the database
  var database = firebase.database();
  
  // Example: Reading data from a specific location
  var couponsRef = database.ref('stores');
  
  couponsRef.once('value', function(snapshot) {
    var coupons = snapshot.val();
    console.log(coupons);
  });

  function removeSpecialCharacters(inputString) {
    return inputString.replace(/[.$#\[\]]/g, '');
  }

  
var storeForm = document.getElementById('storeForm');
storeForm.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('hello');
  let selectedCategories = [];
  let checkboxes = document.getElementsByName("categories");

  
    
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });



  var storeNameEnglish = document.getElementById('storeNameEnglish').value;
  var storeNameHebrew = document.getElementById('storeNameHebrew').value;
  var description = document.getElementById('description').value;
  var keywords = document.getElementById('keywords').value;
  var url = document.getElementById('url').value;
  var nameFile = removeSpecialCharacters(storeNameEnglish);
  console.log(nameFile);
  var logoFile = document.getElementById('logo').files[0];
  var storageRef = firebase.storage().ref('images/logos/' + nameFile);
  storageRef.put(logoFile).then(function(snapshot) {
    console.log('Logo uploaded');
    storageRef.getDownloadURL().then(function(logoUrl) {
      // Store data in Firebase Database
      var newStoreRef = database.ref('stores/' + nameFile);
      newStoreRef.set({
        NameEnglish: storeNameEnglish,
        NameHebrew: storeNameHebrew,
        Description: description,
        keywords: keywords,
        url: url,
        logo: logoUrl,
        visits: 0,
        categories: selectedCategories
      }).then(function() {
        console.log('Store data saved to Firebase');
        storeForm.reset();
      }).catch(function(error) {
        console.error('Error saving data: ', error);
      });
    });
  });


});
  
  // Your other Firebase Database code can go here