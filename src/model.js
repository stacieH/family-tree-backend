const mongoose = require('mongoose')

const FamilyMemberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is missing'],
        trim: true
    },
    nickname:{
        type: String,
        trim: true,
        default: null
    },
    birthdate: {
        type: Date,
        default: null
    },
    age: {
        type: Number,
        min:[0, "Age cannot be negative"],
        default: null
    },
    relationship: {
        type: String,
        trim: true,
        default: null
    },
    parents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FamilyMember"
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema )

module.exports = {FamilyMember}