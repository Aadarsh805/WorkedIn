exports.getContract = (req,res) => {
    res.send('My Contract')
}

exports.initializeContract = (req,res) => {
    res.send('Contract Initialized')
}

exports.acceptContract = (req,res) => {
    res.send('Accept Initialized')
}

exports.denyContract = (req,res) => {
    res.send('Deny Contract')
}

exports.updateContract = (req,res) => {
    res.send('Update Contract')
}