export async function roleMiddleware(req, res, next){
    const user = req.user;
    if (user.role !== 'admin') {
        return res.status(403).json({
            message:"FORBIDDEN, ypu don't have access."
        })
    }

    req.user = user;
    next();
}