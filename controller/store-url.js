const db = require("../db/memory");

module.exports = (request, response) => {
    if (!request.body || !request.body.url) {
        return response.status(400).json({
            status: "error",
            message: "Url is required in the body request's"
        });
    }

    const { body: {
        url: urlToShorten,
        requested_url: requestedUrl
    }} = request;

    if (requestedUrl && db.keyExist(requestedUrl)) {
        return response.status(400).json({
            status: "error",
            message: "The requested url is already taken"
        });
    }

    const newUrl = requestedUrl || generateString();

    try {
        db.store(newUrl, urlToShorten, true);
    } catch (error) {
        return response.status(
            error.statusCode || 500
        ).json(error);
    }

    response.status(201).send({
        new_url: `${ request.hostname }/${ newUrl }`
    });
};

function generateString() {
    const size = Math.floor((Math.random() * (9 - 6 + 1)) + 6);
    const randomSizeString = (`${
        Math.random().toString(36)
    }${
        Math.random().toString(36)
    }`).replace(/0\./g, "");

    return randomSizeString.substring(0, size);
}
