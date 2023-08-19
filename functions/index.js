const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
admin.initializeApp();
const app = express();

// Serve static assets from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Set the views directory and view engine
app.set('views', path.join(__dirname, '../public/views'));
app.set('view engine', 'ejs');

app.get('/cart', async (req, res) => {
  try {
    res.render('cart');
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving store data' + error });
  }
});

app.get('/stores/:storeId', async (req, res) => {
  const storeId = req.params.storeId;
  try {
    const snapshot = await admin.database().ref('stores/' + storeId).once('value');
    const storeData = snapshot.val();

    if (storeData) {
      const storeName = storeData.NameEnglish;
      res.render('store', { storeData: storeData });
    } else {
      res.status(404).json({ error: storeId + ' not found ' + storeData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving store data' + error });
  }
});

exports.restApi = functions.https.onRequest(app);
