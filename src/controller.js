const {FamilyMember} = require('./model')

// Add new family member
const addNewFamily = async (req,res) => {
    try{
        let newMember = await FamilyMember.create(req.body)
        res.status(201).json(newMember)
    }
    catch(err){
        res.status(400).json({
            message: "Failed to add family member",
            error: err.message
        })
    }
}

// Get all family members
const getMember = async (req, res) => {
    try{
        const members = await FamilyMember.find()

        res.status(200).json(members)
    }
    catch(err){
        res.status(500).json({
            message: "Failed to retrieve family members",
            error:err.message
        })
    }
}

// Get family member by ID
const getMemberById = async (req, res) => {
    try{
        const id = req.params.id
        const member = await FamilyMember.findById(id)
            .populate('parents', 'name nickname birthdate');

        if(!member){
            return res.status(404).json({
                message: "Family member not found"
            })
        }

        res.status(200).json(member)
    }
    catch(err){
        res.status(400).json({
            message: "Invalid family member ID",
            error: err.message
        })
    }
}

// Update family member
const updateMember = async (req, res) => {
    try{
        const id = req.params.id
        const body = req.body
        const options = {
            new: true,
            runValidators: true
        }
        const member = await FamilyMember.findByIdAndUpdate(id, body, options)

        if(!member){
            return res.status(404).json({
                message: "Family member not found"
            })
        }
        
        res.status(200).json(member)
    }
    catch(err){
        res.status(400).json({
            message: "Failed to update family member",
            error: err.message
        })
    }
}

// Delete family member
const deleteMember = async (req, res) => {
    try{
        const id = req.params.id
        const member = await FamilyMember.findByIdAndDelete(id)

        if(!member){
            return res.status(404).json({
                message: "Family member not found"
            })
        }

        res.status(200).json({
            message: "Successfully deleted family member"
        })
    }
    catch(err){
        res.status(400).json({
            message: "Failed to delete family member",
            error: err.message
        })
    }
}

module.exports = {getMember, getMemberById, deleteMember, updateMember,addNewFamily}