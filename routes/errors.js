module.exports = function (app) {

    //if there no route for required path, throw 404 - not found
    app.use(notFoundResponse);

    //500 when internal error occurs
    app.use(errorResponse);

    function notFoundResponse(req, res, next) {
        res.status(404);

        if (req.accepts('html')) {
            return res.send("<h2>I'm sorry, I couldn't find that page.</h2>")
        }

        if (req.accepts('json')) {
            return res.json({error: 'Not found'});
        }

        //default response type
        res.type('txt');
        res.send("Hmm, couldn't find that page.")
    }

    function errorResponse(err, req, res, next) {
        if(err instanceof NotFoundException){
            notFoundResponse(req, res, next);
        }
        console.error('error at %s\n', req.url, err, err.stack);
        res.send(500, "Oops, internal error occurs.")
    }
};