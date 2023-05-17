
exports.createBug = (req,res,next) => {
  res.status(200).json({message: "Bug Created Successfully!"})
}

exports.retrieveBugs = (req,res,next) => {
  res.status(200).json({message: "Bugs Retrieved Successfully!"})
}

exports.updateBug = (req,res,next) => {
  res.status(200).json({message: "Bug updated Successfully!"})
}

exports.deleteBug = (req,res,next) => {
  res.status(200).json({message: "Bug Deleted Successfully!"})
}


exports.assignToUser = (req,res,next) => {
  res.status(200).json({message: "Bug Assign To User Successfully!"})
}

// see if there is any need to make BugStatusUpdate route separately
