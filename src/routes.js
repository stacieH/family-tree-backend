const {
    addNewFamily,
    getMember,
    getMemberById,
    deleteMember,
    updateMember
} = require('./controller')

const routes = (app) => {
    app.route('/members')
        .get((req, res, next)=>{
            next();
        },getMember)
        // create
        .post(addNewFamily)
        
    app.route('/members/:id')
        // get specific contact
        .get(getMemberById)
        // updating specific contact
        .put(updateMember)
        // deleting specific contact
        .delete(deleteMember)
}

module.exports={routes}