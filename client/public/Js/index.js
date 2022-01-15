import Bestelling from "./bestelling.js";
import Produkt from "./produkt.js";


const bestellingTableBody = document.querySelector("#bestelling tbody");
const bestelButton = document.querySelector("#bestelling button");
let bestelling = null;

fetch("/api/produkten")
    .then((response) => {
        return response.json();
    })
    .then((produkten) => {
        produkten = produkten.map((produktZonderClass) => {
            return new Produkt(
                produktZonderClass._naam, 
                produktZonderClass._omschrijving, 
                produktZonderClass._prijs, 
                `${produktZonderClass._naam}.jpg`, 
                produktZonderClass._label);
        })
        const produktenSection = document.getElementById("produkten");
        let produktenHTMLString = "";
        produkten.forEach((produkt, index) => {
            if(index % 4 === 0) produktenHTMLString += "<div class='row'>";
            produktenHTMLString += produkt.toHTMLString();
            if(index % 4  === 3 || index === produkten.length - 1) produktenHTMLString += "</div>"
        });
        produktenSection.innerHTML = produktenHTMLString;

        const bestelButtons = document.querySelectorAll(".btn-primary");
        for(let i =0; i < bestelButtons.length; i++) {
            const bestelButton = bestelButtons[i];
            bestelButton.addEventListener("click", (e) => {
                if(bestelling == null)
                {
                    bestelling = new Bestelling();
                }
                let id = e.target.getAttribute("id");
                let naamVanProdukt = id.replace("produkt-", "");
                // let gevondenItem = produkten.find(naamVanProdukt);
                const result = produkten.find( ({ _naam }) => _naam === naamVanProdukt );
                bestelling.addBesteldProdukt(result);
                bestellingTableBody.innerHTML = bestelling.toHTMLString();
            });
        }
    })

bestelButton.addEventListener("click", (e) => {
    if(bestelling != null) {
        bestelling.bestel();
    }
});