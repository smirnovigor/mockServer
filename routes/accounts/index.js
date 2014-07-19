
module.exports = function(app, ctrl){
    app.get('/accounts/simple', ctrl.simpleGet);
    app.get('/accounts', ctrl.filteredAndSortedGet);
    app.get('/accounts/:accountId', ctrl.getByIdFromPathParam);
    app.put('/accounts', ctrl.putAndReturnByIdFromBodyParam);
    app.post('/accounts', ctrl.postAndReturnByIdFromHeaderParam);
};
