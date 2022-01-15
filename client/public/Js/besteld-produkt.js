export default class BesteldProduct {
    constructor(produkt)
    {
        this._produkt = produkt._naam;
        this._prijs = produkt._prijs;
        this._aantal = 1;
    }

    get produkt() {
        return this._produkt;
    }

    get prijs() {
        return this._prijs;
    }

    get aantal() {
        return this._aantal;
    }
    
    set aantal(value) {
        return this._aantal = value;
    }

    toHTMLString() {
        console.log("bestelditem: ",this.produkt);
        return `
            <tr>
                <td>${this._aantal}</td>
                <td>${this.produkt}</td>
                <td>${this._prijs}</td>
                <td><a href="#" id="produkt-${this.produkt}" class="btn btn-secondary"> - </a></td>
            </tr>
        `;
    }

    toString() {
        return `
            BesteldProdukt: ${this._aantal}, ${this._produkt}, ${this._prijs}
        `;
    }
}