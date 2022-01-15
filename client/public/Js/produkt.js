export default class Produkt {
    constructor(naam, omschrijving, prijs, afbeeldingFileName, label) {
        this._naam = naam;
        this._omschrijving = omschrijving;
        this._prijs = prijs;
        this._afbeeldingFileName = afbeeldingFileName;
        this._label = label;
    }

    get naam() {
        return this._naam;
    }

    set naam(value) {
        if (value.length == 0) {
            console.log("Name must be filled in")
            return
        }
        this._naam = value;
    }

    get omschrijving() {
        return this._omschrijving;
    }

    set omschrijving(value) {
        if (value.length == 0) {
            console.log("Description must be filled in")
            return
        }
        this._omschrijving = value;
    }

    get prijs() {
        return this._prijs;
    }

    set prijs(value) {
        if (value.length == 0) {
            console.log("Price must be filled in")
            return
        }
        if (isNaN(value)) {
            console.log("Price must be a number")
            return
        }
        this._prijs = value;

    }

    get afbeeldingFileName() {
        return this._afbeeldingFileName;
    }

    set afbeeldingFileName(value) {
        this._afbeeldingFileName = value;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        if (value.length == 0) {
            console.log("Label must be filled in")
            return
        }
        this._label = value;
    }

    toHTMLString() {
        return `
        <div class="card" style="width: 18rem">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <h5 class="card-title">${this.naam}</h5>
                        <h5 class="card-title">€${this.prijs}</h5>
                    </div>
                    <img
                        src="images/${this.afbeeldingFileName}"
                        class="card-img-top produkt-foto"
                        alt="${this.naam}"
                    />
                    <p class="card-text">${this.omschrijving}</p>
                    <div class="d-flex align-items-center justify-content-between">
                        <span class="badge rounded-pill bg-danger">${this.label}</span>
                        <a href="#" id="produkt-${this.naam}" class="btn btn-primary">Bestellen</a>
                    </div>
                </div>
            </div>
        `;
    }

    tostring() {
        return `${this.naam}, ${this.prijs}, ${this.omschrijving}, ${this.afbeeldingFileName}, ${this.label}`;
    }
}