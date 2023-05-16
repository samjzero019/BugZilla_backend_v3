
exports.register = (req,res,next)=>{
    res.status(200).json({message:'Hi from Register in auth Service'})
}


exports.login = (req,res,next)=>{
    res.status(200).json({message:'Hi from Login in auth Service'})
}

exports.logout = (req,res,next)=>{
    res.status(200).json({message:'Hi from Logout in auth Service'})
}