const db = require("../db/memory");

module.exports = (request, response) => {
    const { params: { urlParameter }} = request;

    let redirectUrl;
    try {
        redirectUrl = db.get(urlParameter);
    } catch (error) {
        response.status(error.statusCode || 500).json(error);
    }

    if (!redirectUrl) {
        return response.status(404).json({
            status: "error",
            message: "url not found"
        });
    }
    return response.redirect(redirectUrl);
};
