const express = require("express");
const path = require("path");

module.exports = () => {
    const router = express.Router();

    router.get("/", (req, res) => {
        res.sendFile(path.join(`${ __dirname }/view/index.html`));
    });
    return router;
};
