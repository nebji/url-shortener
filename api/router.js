const express = require("express");
const path = require("path");

module.exports = () => {
    const router = express.Router();

    router.get("/", (req, res) => {
        res.sendFile(path.join(`${ __dirname }/../view/index.html`));
    });

    router.post("/", require("../controller/store-url"));
    router.get("/:urlParameter", require("../controller/redirect-url"));

    // Default url
    router.use((request, response) => {
        response.status(404).sendFile(
            path.join(`${ __dirname }/../view/not-found.html`)
        );
    });
    return router;
};
