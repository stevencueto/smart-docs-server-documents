

const jwt = require('jsonwebtoken')
const handler = require('./serverError')

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if(!token){
        return handler("Token Must be provided", res ,"Token Must be provided" )
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_GENERATOR)
        req.user = decoded
        next()
    } catch (error) {
        return handler(error, res, error.message)

    }
}