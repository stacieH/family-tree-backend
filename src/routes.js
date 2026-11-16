const {
    addNewFamily,
    getMember,
    getMemberById,
    deleteMember,
    updateMember
} = require('./controller')

const routes = (app) => {
    // Family members collection
    app.route('/members')
        // get list
        .get(getMember)
        // create
        .post(addNewFamily)
        
    // Individual family member
    app.route('/members/:id')
        // get specific member
        .get(getMemberById)
        // updating specific member
        .put(updateMember)
        // deleting specific member
        .delete(deleteMember)
}

module.exports={routes}