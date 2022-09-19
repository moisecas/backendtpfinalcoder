export default class product {
    #name;
    #price;
    #image;
    #description;

    constructor(name, price, image, description) {
        this.#name = name;
        this.#price = price;
        this.#image = image;
        this.#description = description;
    }

    // Getters and Setters
    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get price() {
        return this.#price;
    }

    set price(price) {
        this.#price = price;
    }

    get image() {
        return this.#image;
    }

    set image(image) {
        this.#image = image;
    }

    get description() {
        return this.#description;
    }

    set description(description) {
        this.#description = description;
    }

    // Methods
    toString() {
        return `Name: ${this.#name}, Price: ${this.#price}, Image: ${this.#image}, Description: ${this.#description}`;
    }

    toJSON() {
        return {
            name: this.#name,
            price: this.#price,
            image: this.#image,
            description: this.#description
        };
    }

    

}