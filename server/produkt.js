export default class Produkt {
    constructor(naam, omschrijving, prijs, label) {
        this._naam = naam;
        this._omschrijving = omschrijving;
        this._prijs = prijs;
        this._label = label;
    }

    get naam() {
        return this._naam;
    }

    get omschrijving() {
        return this._omschrijving;
    }

    get prijs() {
        return this._prijs;
    }

    get label() {
        return this._label;
    }

    tostring() {
        return `${this.naam}, ${this.prijs}, ${this.afbeeldingFileName}`;
    }
}
