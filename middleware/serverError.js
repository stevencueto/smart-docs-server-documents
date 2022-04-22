module.exports = (err, res, message) =>{
    console.error(err.message)
    return res.send({
        success: false,
        data: message,
    })
}