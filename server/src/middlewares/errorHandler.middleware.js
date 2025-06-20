export const errorHandler = (err, req, res, next) => {
    res.status(err.code || 500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
};
