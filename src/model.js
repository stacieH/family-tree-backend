const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FamilyMemberSchema = new Schema({
    name:{
        type: String,
        required: 'name is missing'
    },
    nickname:String,
    age: Number,
    relationship: String,
    date_created:{
        type:Date,
        default: Date.now
    }
})

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema )

module.exports = {FamilyMember}