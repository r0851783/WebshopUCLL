
import BesteldProduct from "./besteld-produkt.js";
        let totaalPrijs = 0;
        let totaalArtikelen = 0;
        const verzendKosten = 5.5;

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

    verwijderProduct(produkt) {
        let besteldProdukt = this._besteldeProdukten.filter((bp) => { //opzoek gaan naar elementen die aan die voorwaarde voldoen
            return produkt._naam === bp.produkt;                      //true
        });

        if(besteldProdukt.length > 0)
        {
            if (besteldProdukt[0].aantal > 1) {
                besteldProdukt[0].aantal--;
                console.log("aantal verlaagd"); 
            }
            else{
                for (let i = 0; i < this._besteldeProdukten.length; i++) {
                    if(this._besteldeProdukten[i] === besteldProdukt[0])
                    {
                        console.log("Delete the item from array!")
                        this._besteldeProdukten.splice(i,1);
                    }       
                }
            }                            
        } 
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

    winkelwagen() {
        totaalArtikelen = 0;
        //bestelling winkelwagen
        for (let i = 0; i < this._besteldeProdukten.length; i++) {
            
            totaalArtikelen += this._besteldeProdukten[i]._prijs * this._besteldeProdukten[i]._aantal;
        }

        console.log("€"+totaalArtikelen);
        totaalPrijs = (totaalArtikelen + verzendKosten);
    }

    toWinkelwagenString()
    {
        let htmlString = `
            <tr>
                <td>€${totaalArtikelen}</td>
                <td>€${verzendKosten}</td>
                <td>€${totaalPrijs}</td>
            </tr>
        `;
        return htmlString;
    }
}