
exports.createComment = (req,res,next)=>{
    res.status(200).json({message:"Comment Created Successfully!"})
}


exports.getComments = (req,res,next)=>{
    res.status(200).json({message:"Comment Retrieved Successfully!"})
}


exports.updateComment = (req,res,next)=>{
    res.status(200).json({message:"Comment Updated Successfully!"})
}


exports.deleteComment = (req,res,next)=>{
    res.status(200).json({message:"Comment Deleted Successfully!"})
}

