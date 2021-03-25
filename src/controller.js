const {FamilyMember} = require('./model')

const addNewFamily = (req,res) => {
    let newMember = new FamilyMember(req.body)
    newMember.save((err, member)=>{
        if(err){
            res.send(err)
        }
        res.json(member)
    })
}

const getMember = (req, res) => {
    FamilyMember.find({}, (err, member)=>{
        if(err){
            res.send(err)
        }
        res.json(member)
    })
}

const getMemberById = (req, res) => {
    FamilyMember.findById(req.params.id, (err, member)=>{
        if(err){
            res.send(err)
        }
        res.json(member)
    })
}

const updateMember = (req, res) => {
    FamilyMember.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, useFindAndModify:false}, (err, member)=>{
        if(err){
            res.send(err)
        }
        res.json(member)
    })
}
const deleteMember = (req, res) => {
    FamilyMember.remove({_id: req.params.id}, (err, member)=>{
        if(err){
            res.send(err)
        }
        res.json({message: "successfully deleted member"})
    })
}

module.exports = {getMember, getMemberById, deleteMember, updateMember,addNewFamily}