exports.allowCrossDomain = function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Content-Length,X-Requested-With,'+req.headers['access-control-request-headers']);

    next();
};

exports.delayResponse = function(delay){
    return function(req, res, next){
        setTimeout(function(){
            next();
        }, delay);
    };
};
