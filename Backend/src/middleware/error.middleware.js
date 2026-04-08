export const errorHandler = (err, req, res, next) => {
    // If the error has a status code, use it; otherwise, default to 500 (Server Error)
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        // Only show the stack trace in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};