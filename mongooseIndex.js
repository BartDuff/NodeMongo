// clréation du client
const MongoClient = require('mongodb').MongoClient;

const express = require('express');

const app = express();
// Définition de l'url

//configuration de pug
app.set('view engine', 'pug');
app.set('views', './views');
const url = 'mongodb://localhost:27017';

// Définition de la bdd
const base = 'Flights';

let db;
// Connection à la bdd
MongoClient.connect(url, {
    useNewUrlParser: true
}, (err, conn) => {
    if (err) {
        throw err;
    }
    console.log("Connection MongoDB OK");
    db = conn.db(base);
});

//route /flights
app.get('/flights/:isocountry', (req, res) => {
    // Query
    db.collection("airports").find({ 'iso_country': req.params.isocountry }, { 'ident':1, 'name':1}).toArray((err, result) => {
        if (err) {
            throw err;
        }
        res.render('countryFlights', {airp: result, iso: req.params.isocountry });
        // conn.close();
    })
});

app.listen(5000, "localhost", () => {
    console.log("Ecoute sur le port 5000...");
})