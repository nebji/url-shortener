const express = require("express");
const app = express();
const router = require("./api/router");

console.log("App started");
app.use(express.json());
app.use(express.static(`${ __dirname }/view/static`));
app.use("/", router());

app.listen(3000, () => {
    console.log("Server ready!");
});
