const auth = (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({error: 'Unauthorised access.'});
    }
    // If the user is authenticated, redirect them to the user routes
    next();
};

module.exports = auth;