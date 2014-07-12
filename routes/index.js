var fs = require('fs'),
    errors = require('./errors'),
    defaultRoute = require('./default'),
    pathModule = require('path'),
    routesPath = root + '/routes/',
    controllersPath = root + '/controllers/';

module.exports = function(app){

    // attach all routes that placed in "/routers/{ANY DIRECTORY}*n" folders,
    // and pass their controllers that sitting in "/controllers/{SAME PATH}" folder
    attachRoutes();

    //try to handle request with default route
    defaultRoute(app);

    // handle not found and internal errors
    errors(app);


    // FUNCTIONS

    function attachRoutes(){
        fs.readdirSync(routesPath).forEach(function(fileName){
            if(fs.statSync(routesPath + fileName).isDirectory()){
                dive(routesPath + fileName);
            }
        })
    }

    function dive(path){

        if(fs.statSync(path).isFile() && pathModule.extname(path) == '.js'){

            try{
                var route = require(path);
                var ctrl = require(controllersPath + path.split(routesPath)[1]);
                //call route
                return route(app, ctrl);
            }
            catch(err){
                console.error(err, err.stack)
            }
        }
        else if(fs.statSync(path).isDirectory()){

            fs.readdirSync(path).forEach(function(fileName){
                dive(path + pathModule.sep + fileName);
            })
        }
    }
};
