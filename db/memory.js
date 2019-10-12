// Manage the DB connection here

class MemoryDB {
    constructor() {
        this.db = {};
    }

    keyExist(key) {
        return (key in this.db);
    }

    store(key, value, unique) {
        console.log("here");
        if ((key in this.db) && unique) {
            console.log(key);
            throw new Error("DUPLICATE_KEY");
        }
        this.db[key] = value;
    }

    get(key) {
        return this.db[key];
    }
}

module.exports = new MemoryDB();
