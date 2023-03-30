class Text {
    constructor(text) {
        this.string = text;
    }

    toString() {
        return this.string;
    }

    toUpperCase() {
        return this.string.toUpperCase();
    }
}

class Shout {
    constructor(text) {
        this.text = text;
    }

    toString() {
        return this.text.toUpperCase();
    }
}

console.log(new Text("Hello, I'm talking").toString());

console.log(new Shout(new Text("Hello, I'm shouting!")).toString());
