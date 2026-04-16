export const errorHandler = (err, req, res, next) => {
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