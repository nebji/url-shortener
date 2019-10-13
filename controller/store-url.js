const db = require("../db/memory");

module.exports = (request, response) => {
    // Check the required field
    if (!request.body || !request.body.url) {
        return response.status(400).json({
            status: "error",
            message: "Url is required in the body request's"
        });
    }

    const {
        body: {
            url: urlToShorten,
            requested_path: requestedPath
        },
        headers: { host }
    } = request;

    // Reject duplicate key
    if (requestedPath && db.keyExist(requestedPath)) {
        return response.status(400).json({
            status: "error",
            message: "The requested url is already taken"
        });
    }

    const newPath = requestedPath || generateString();

    try {
        db.store(newPath, urlToShorten, true);
    } catch (error) {
        return response.status(
            error.statusCode || 500
        ).json(error);
    }

    return response.status(201).send({
        new_url: `${ host }/${ newPath }`
    });
};

// Function to generate a random string containing letters and numbers
// of a random size between 6 and 9
function generateString() {
    const size = Math.floor((Math.random() * (9 - 6 + 1)) + 6);
    const randomSizeString = (`${
        Math.random().toString(36)
    }${
        Math.random().toString(36)
    }`).replace(/0\./g, "");

    return randomSizeString.substring(0, size);
}
