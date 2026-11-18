
function errorHandler(err, req, res, next) {

    console.error(err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: "SKU already exists"
        });
    }

    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
}

module.exports = errorHandler;
