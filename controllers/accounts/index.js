var _ = require('underscore'),
    utils = require(root + '/utils'),
    dataStore = utils.dataStore();
/**
 *
 * @param req
 * @param res
 */
exports.simpleGet = function(req, res){
    res.json(dataStore.get('/accounts'));
};

/**
 *
 * @param req
 * @param res
 */
exports.filteredAndSortedGet = function(req, res){

    // GET DATA
    var data = dataStore.get(req.url);

    // FILTER DATA
    if(req.query.startsAt && req.query.endsAt){
        var startsDate = new Date(req.query.startsAt);
        var endsDate = new Date(req.query.endsAt);

        data.list = _.filter(data.list, function(elem){

            var elemDate = new Date(elem.data.createdAt);

            return startsDate.getTime() <= elemDate.getTime() &&
                elemDate.getTime() <= endsDate.getTime();
        });
    }

    // SORT DATA
    if(req.query.orderBy){

        data.list = _.sortBy(data.list, function(elem){return elem.data[req.query.orderBy]});

        if(!req.query.asd){
            data.list.reverse();
        }
    }

    res.json(data);
};

/**
 *
 * @param req
 * @param res
 */
exports.getByIdFromPathParam = function(req, res){

    // GET DATA
    var data = dataStore.get('/accounts');

    // FIND DATA BY ID THAT STORED IN URL PATH
    data = _.find(data.list, function(elem){return elem.data.id == req.param('accountId')});

    res.json(data);
};

/**
 *
 * @param req
 * @param res
 */
exports.putAndReturnByIdFromBodyParam = function(req, res){

    //FAKE PUT DATA
    dataStore.store('/fake/path', {});

    // GET DATA
    var data = dataStore.get(req.url);

    // FIND DATA BY ID THAT STORED IN BODY
    data = _.find(data.list, function(elem){return elem.data.id == req.body.accountId});

    res.send(200);
};

/**
 *
 * @param req
 * @param res
 */
exports.postAndReturnByIdFromHeaderParam = function(req, res){

    //FAKE POST DATA
    dataStore.store('/fake/path', {});

    // GET DATA
    var data = dataStore.get('/accounts');

    // FIND DATA BY ID THAT STORED IN HEADER
    data = _.find(data.list, function(elem){return elem.data.id == req.get('accountId')});

    //RETURN PARAM IN HEADER
    res.set('resourceId', 323233);

    res.send(201, {'resourceId': 323233});
};
