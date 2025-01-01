require('dotenv').config()

const mongoose = require('mongoose')




class Database {
    constructor() {
        if (!Database.instance) {
            this.connection = null;
            Database.instance = this;
        }
        return Database.instance;
    }


    async connect(uri) {
        if (!this.connection) {
            console.log("Connecting to the database...");
            this.connection = await mongoose.connect(uri, {
            })
                .then(() => {
                    console.log("successfully connected")
                })
                .catch((err) => {
                    console.log(err)
                })
            console.log("Database connected!");
        }
        return this.connection;
    }

    getConnection() {
        if (!this.connection) {
            throw new Error("Database not connected. Call connect() first.");
        }
        return this.connection;
    }
}

const instance = new Database();

module.exports = instance;
