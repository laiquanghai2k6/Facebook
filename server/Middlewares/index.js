const jwt = require('jsonwebtoken')

const verifyToken = async (req, res,next) => {
    const header = req.header('Authorization')
    const token = header.split(' ')[1]
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
            if (err) res.status(403).json({ error: 'token hết hạn' })
            
                req.userId = decode.userId
                next()
        }
    )
}

module.exports = {verifyToken}