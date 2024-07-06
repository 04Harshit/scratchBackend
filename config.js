const firebase = require('firebase-admin')
const serviceAccount = require('./serviceAccount.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

let db;
try {
  db = firebase.firestore();
} catch (error) {
  console.error("Firestore initialization error", error.stack);
}

module.exports = db;