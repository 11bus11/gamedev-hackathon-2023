export default class Factory {
    static products = new Map();

    constructor() { throw Error(`Tried to instantiate static class ${this.constructor.name}`); }

    static register(cls) {
        const key = cls.name.toLowerCase();
        this.products.set(key, cls);
    }

    static get(name) {
        return this.products.get(name);
    }

    static create(name, ...args) {
        const product = this.products.get(name);
        if (product) return new product(...args);
        return null;
    }
}