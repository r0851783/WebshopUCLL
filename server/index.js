import Produkt from "./produkt.js";
import express from "express";

const app = express();
const port = 3000;

app.use(express.static('../client/public'));
app.use(express.json());

let produkten = [
    new Produkt("Paraplu", "ideaal voor de regen", 15, "regen"),
    new Produkt("Jas", "ideaal voor de regen", 10, "regen"),
    new Produkt("Penhouder", "skooool", 3, "UCLL"),
    new Produkt("Koeltas", "koelingsss", 37, "etuhh"),
    new Produkt("Brooddoos", "etuhhhh", 5, "voeding"),
    new Produkt("Paraplu2", "leuke paraplu", 20, "regen"),
    new Produkt("Brooddoos2", "etentje voor picknikc", 7, "voeding"),
    new Produkt("Jas2", "leuke jas", 22, "regen")
];

let bestellingen = [];
let bestelId = 0;

app.get("/api/produkten", (req,res) => {
    res.json(produkten);
});

app.post("/api/bestellingen", (req, res) => {
    let toegekendeId = bestelId++;
    console.log(req.body);
    bestellingen.push(req.body);
    res.json({
        bestelId: toegekendeId
    });
}); 

app.get("/api/bestellingen", (req, res) => {
    res.json(bestellingen);
});

app.listen(port, function() {
    console.log("Server listening on port "+port);
});