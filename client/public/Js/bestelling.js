
import BesteldProduct from "./besteld-produkt.js";

export default class Bestelling {
    constructor() {
        this._besteldeProdukten = []; //lege array voor bestelde producten
        this._bestelId = null;
    }

    get bestelId() {
        return this._bestelId;
    }

    addBesteldProdukt(produkt) {
        let besteldProdukt = this._besteldeProdukten.filter((bp) => { //opzoek gaan naar elementen die aan die voorwaarde voldoen
            return produkt._naam === bp.produkt;                      //true
        });

        if(besteldProdukt.length > 0)
        {
            besteldProdukt[0].aantal++;                               //0de element omdat er 1 resultaat inzit
            console.log("aantal verhoogd");                           
        } else {
            this._besteldeProdukten.push(new BesteldProduct(produkt)); //geen gevonden, nieuwe aanmaken
            console.log(this._besteldeProdukten);
        }
    }

    bestel() {
        // window.open(`mailto:bijdebakker@gmail.com?subject=Bestelling&body=${encodeURI(this.toMailBody())}`);
        fetch("/api/bestellingen",
            {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(this)
            })
            .then((response) => {
                return response.json();
            })
            .then((bestelAntwoord) => {
                // console.log("bestelid: "+bestelAntwoord.bestelId);
                this._bestelId = bestelAntwoord.bestelId;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    toHTMLString() {
        let alleBesteldeProdukten = "";
        this._besteldeProdukten.forEach((besteldProdukt) => {
            alleBesteldeProdukten += besteldProdukt.toHTMLString();
        });
        return alleBesteldeProdukten;
    }
    // toMailBody() {
    //     let boodschap = `
    //         Beste,
            
    //         Ik had graag de volgende bestelling geplaatst:
    //         ${this.toString()}

    //         Met vriendelijke groeten,
    //         Een blije klant
    //     `;
    //     return boodschap;
    // }

    toString() {
        let alleBesteldeProdukten = "";
        this._besteldeProdukten.forEach((besteldProdukt) => {
            alleBesteldeProdukten += `${besteldProdukt.toString()}\n`;
        });
        return alleBesteldeProdukten;
    }
}