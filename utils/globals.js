GLOBAL.NotFoundException = function(message){
    this.name = 'NotFoundException';
    this.code = 404;
    this.message = message || 'NotFoundException';
};

GLOBAL.NotFoundException.prototype = new Error();
GLOBAL.NotFoundException.constructor = GLOBAL.NotFoundException;

GLOBAL.root = require('path').dirname(__dirname);




