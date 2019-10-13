// Simulate a database
class MemoryDB {
    constructor() {
        this.db = {};
    }

    keyExist(key) {
        return (key in this.db);
    }

    store(key, value, unique) {
        if ((key in this.db) && unique) {
            throw new Error("DUPLICATE_KEY");
        }
        this.db[key] = value;
    }

    get(key) {
        return this.db[key];
    }
}

module.exports = new MemoryDB();
