const db = require("../db/memory");
const path = require("path");

module.exports = (request, response) => {
    const { params: { urlParameter }} = request;

    let redirectUrl;
    try {
        redirectUrl = db.get(urlParameter);
    } catch (error) {
        response.status(error.statusCode || 500).json(error);
    }

    if (!redirectUrl) {
        return response.status(404).sendFile(
            path.join(`${ __dirname }/../view/not-found.html`)
        );
    }

    // Add a http:// default prefix if the
    // URL doesn't have one (https or http)
    if (!redirectUrl.match(/^https?:\/\//g)) {
        redirectUrl = `http://${ redirectUrl }`;
    }
    return response.redirect(redirectUrl);
};
