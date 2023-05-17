
exports.getAllUsers = (req,res,next)=>{
    res.status(200).json({message:'Users retrieval successful!'})
}

exports.changeRole = (req,res,next)=>{
    res.status(200).json({message:'User Role Changed Successfully!'})
}
