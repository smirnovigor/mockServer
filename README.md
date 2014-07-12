# Mock server #
## Server for simple mock rest services. ##

### Getting Started

To install node modules run

 ```shell
 npm install
 ```

 To start run

 ```shell
 npm start
 ```

## Examples
Let's implement accounts service http://127.0.0.1:3000/accounts.

To create simple GET service, just add your *list.json* file into "data" folder with specific path [/data/accounts/list.json](https://github.com/smirnovigor/mockServer/blob/master/data/accounts/list.json).
It's enough to simple GET service.

To crete custom GET route, you should add account's **route** into [/routes/accounts/index.js](https://github.com/smirnovigor/mockServer/blob/master/routes/accounts/index.js) and **controller** into [/controllers/accounts/index.js](https://github.com/smirnovigor/mockServer/blob/master/controllers/accounts/index.js). 

There's few implemented routes and controller's methods for our example:

- GET **/accounts/simple** - simple GET method (e.g. http://127.0.0.1:3000/accounts/simple)
 ```javascript
 exports.simpleGet = function(req, res){
     res.json(dataStore.get('/accounts'));
 };
 ```
 **dataStore** is utils object that manage your data, read from *list.json* file, store data.

 - GET **/accounts** - GET method with data filtering by *createdAt* date and sorting by *orderBy* param (e.g. http://127.0.0.1:3000/accounts?startsAt=2014-04-05T17:25:04Z&endsAt=2014-04-15T17:25:04Z&orderBy=id)
 ```javascript
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
 ```

- GET **/accounts/:accountId** - GET method by account id (e.g. http://127.0.0.1:3000/accounts/3)
 ```javascript
exports.putAndReturnByIdFromBodyParam = function(req, res){

    //FAKE PUT DATA
    dataStore.store('/fake/path', {});

    // GET DATA
    var data = dataStore.get(req.url);

    // FIND DATA BY ID THAT STORED IN BODY
    data = _.find(data.list, function(elem){return elem.data.id == req.body.accountId});

    res.send(200);
};
```

- PUT **/accounts** - fake PUT 
 ```javascript
 exports.putAndReturnByIdFromBodyParam = function(req, res){

    //FAKE PUT DATA
    dataStore.store('/fake/path', {});

    // GET DATA
    var data = dataStore.get(req.url);

    // FIND DATA BY ID THAT STORED IN BODY
    data = _.find(data.list, function(elem){return elem.data.id == req.body.accountId});

    res.send(200);
};
 ```

- POST **/accounts** - fake POST
 ```javascript
 exports.postAndByIdFromHeaderParam = function(req, res){

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
 ```

Our route looks like this:
 ```javascript
module.exports = function(app, ctrl){
    app.get('/accounts/simple', ctrl.simpleGet);
    app.get('/accounts', ctrl.filteredAndSortedGet);
    app.get('/accounts/:accountId', ctrl.getByIdFromPathParam);
    app.put('/accounts', ctrl.putAndReturnByIdFromBodyParam);
    app.post('/accounts', ctrl.postAndByIdFromHeaderParam);
};
```



http://127.0.0.1:3000/accounts/simple

http://127.0.0.1:3000/accounts?startsAt=2014-04-05T17:25:04Z&endsAt=2014-04-15T17:25:04Z

http://127.0.0.1:3000/accounts/3

put and post
http://127.0.0.1:3000/accounts
