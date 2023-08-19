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
  couponForm = document.getElementById("couponForm");

function toggleField(elementId, checkboxId) {
    var field = document.getElementById(elementId);
    var checkbox = document.getElementById(checkboxId);

    field.disabled = !checkbox.checked;
    if(!checkbox.checked){
      field.style.backgroundColor = '#fafafa';
    }
    else{
      field.style.backgroundColor = '#FFFF'
    }
    
}

function fetchStores() {
    var storeSelect = document.getElementById("storeSelect");
    var storesRef = firebase.database().ref("stores");

    storesRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var storeId = childSnapshot.key;
            var storeName = childSnapshot.val().NameHebrew;
            var option = document.createElement("option");
            option.value = storeId;
            option.text = storeName;
            storeSelect.appendChild(option);
        });
    });
}



couponForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var storeSelect = document.getElementById("storeSelect");
  var selectedStoreId = storeSelect.value;

  var couponData = {
    Code: document.getElementById("couponCode").value,
    Url: document.getElementById("couponUrl").value,
    restrictions: document.getElementById("restrictions").value,
    expireDate: document.getElementById("expireDate").value,
    couponDescription: document.getElementById("couponDescription").value,
    // ... Other coupon data ...
  };

  var couponsRef = firebase
    .database()
    .ref("stores")
    .child(selectedStoreId)
    .child("coupons");
  var newCouponRef = couponsRef.push();
  newCouponRef.set(couponData);

  alert("Coupon registered successfully!");
});