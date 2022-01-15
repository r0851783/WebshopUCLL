import Bestelling from "./bestelling.js";
import Produkt from "./produkt.js";

let bestelling = null;
const bestellingTableBody = document.querySelector("#bestelling tbody");
const bestelButton = document.querySelector("#bestelling button");
const bestellingTableFoot = document.querySelector("#bestelling tfoot");
const verzendKosten = 5.5;

const addRemoveBtnListeners = (produkten) => {
  const removeButtons = document.querySelectorAll(".btn-secondary");
  console.log("removeButtons: ", removeButtons);

  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    console.log(removeButton);
    removeButton.addEventListener("click", (e) => {
      console.log("I've been clicked");
      if (bestelling == null) {
        bestelling = new Bestelling();
      }
      let id = e.target.getAttribute("id");
      let naamVanProdukt = id.replace("produkt-", "");
      // let gevondenItem = produkten.find(naamVanProdukt);
      const result = produkten.find(({ _naam }) => _naam === naamVanProdukt);
      bestelling.verwijderProduct(result);
      bestellingTableBody.innerHTML = bestelling.toHTMLString();
      addRemoveBtnListeners(produkten);
      //bestelling
      bestelling.winkelwagen();
      bestellingTableFoot.innerHTML = bestelling.toWinkelwagenString();
    });
  }
};

const addBestelBtnListeners = (produkten) => {
  const bestelButtons = document.querySelectorAll(".btn-primary");
  console.log("bestelButtons: ", bestelButtons);
  for (let i = 0; i < bestelButtons.length; i++) {
    const bestelButton = bestelButtons[i];
    bestelButton.addEventListener("click", (e) => {
      if (bestelling == null) {
        bestelling = new Bestelling();
      }
      let id = e.target.getAttribute("id");
      let naamVanProdukt = id.replace("produkt-", "");
      // let gevondenItem = produkten.find(naamVanProdukt);
      const result = produkten.find(({ _naam }) => _naam === naamVanProdukt);
      bestelling.addBesteldProdukt(result);
      bestellingTableBody.innerHTML = bestelling.toHTMLString();
      console.log("items: ", bestelling.toHTMLString());
      addRemoveBtnListeners(produkten);
      //bestelling
      bestelling.winkelwagen();
      bestellingTableFoot.innerHTML = bestelling.toWinkelwagenString();
    });
  }
};

const generateCards = (produkten) => {
   produkten = produkten.map((produktZonderClass) => {
     return new Produkt(
       produktZonderClass._naam,
       produktZonderClass._omschrijving,
       produktZonderClass._prijs,
       `${produktZonderClass._naam}.jpg`,
       produktZonderClass._label
     );
   });
   const produktenSection = document.getElementById("produkten");
   let produktenHTMLString = "";
   produkten.forEach((produkt, index) => {
     if (index % 4 === 0) produktenHTMLString += "<div class='row'>";
     produktenHTMLString += produkt.toHTMLString();
     if (index % 4 === 3 || index === produkten.length - 1)
       produktenHTMLString += "</div>";
   });
   produktenSection.innerHTML = produktenHTMLString;
};

fetch("/api/produkten")
  .then((response) => {
    return response.json();
  })
  .then((produkten) => {
    generateCards(produkten);
    addBestelBtnListeners(produkten);
  });

bestelButton.addEventListener("click", (e) => {
  if (bestelling != null) {
    bestelling.bestel();
  }
});
