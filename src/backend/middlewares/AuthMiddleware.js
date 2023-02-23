const { verify } = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken")

    if(!accessToken) return res.json({error: "Cannot move forward without logging in"})

    try {
        const validToken = verify(accessToken, "mysecret");
        req.user = validToken;
        if(validToken){
            return next();
        }
    } catch (e) {
        return res.json({error: e});
    }
}

module.exports = { validateToken };