const mongoose = require('mongoose')

const FamilyMemberSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true, 'First Name is missing'],
        trim: true
    },
    last_name:{
        type: String,
        required: [true, 'Last Name is missing'],
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
    // age: {
    //     type: Number,
    //     min:[0, "Age cannot be negative"],
    //     default: null
    // },
    relationship: {
        type: String,
        trim: true,
        default: null
    },
    parents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "family_member"
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

const FamilyMember = mongoose.model('family_member', FamilyMemberSchema )

module.exports = {FamilyMember}