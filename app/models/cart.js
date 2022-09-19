export default class cart {
    id;
    products;

    constructor(id, products) {
        this.id = id;
        this.products = products;
    }

    // Getters and Setters
    get id() {
        return this.id;
    }

    set id(id) {
        this.id = id;
    }

    get products() {
        return this.products;
    }

    set products(products) {
        this.products = products;
    }

    // Methods
    toString() {
        return `Id: ${this.id}, Products: ${this.products}`;
    }

    toJSON() {
        return {
            id: this.id,
            products: this.products
        };
    }

    
}