var dataStore = require(root + '/utils').dataStore();

module.exports = function (app) {

    // if there no route for required path,
    // try to handle request with default, simple route
    // and try to get data for required path
    app.get('/*', function(req, res){
        res.json(dataStore.get(req.url));
    });
};