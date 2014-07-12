var fs = require('fs');
var pathModule = require('path');
var dataCache = {};
var os=require('os');
var config = require('../config/config');

module.exports.dataStore = function(){

    var get = function(url){
        var path = getFullPath(url);
        //get and clone object
        return JSON.parse(JSON.stringify(dataCache[path] ? dataCache[path] : readFile(path)));
    };

    var readFile = function(path){
        try{
            dataCache[path] = require(path);
        }catch(err){
            console.error('Error: path ' + path + ' not found');
            throw new NotFoundException('Error: path ' + path + ' not found');
        }
        return dataCache[path];
    };

    var store = function(url, obj){
        return dataCache[getFullPath(url)] = obj;
    };

    var storeOnDisk = function(url, obj){
        store(url, obj);

        //store on disk
        var fullPath = getFullPath(url);
        makedir(pathModule.dirname(fullPath));
        fs.writeFileSync(fullPath, JSON.stringify(obj));
    };

    var remove = function(url){
        delete dataCache[getFullPath(url)];
    };

    var makedir = function(path){

        var createLastFolder = function(path){

            if(fs.existsSync(path)){
                return;
            }

            //create parent directory if not exist
            createLastFolder(pathModule.dirname(path));

            fs.mkdirSync(path);
        };

        createLastFolder(path);
    };

    var getFullPath = function(url){
        return config.dataPath + pathModule.sep + normalizeUrlPath(url) + pathModule.sep + 'list.json';
    };

    var normalizeUrlPath = function(url){
        return url
            .match(new RegExp('(?:(?!\\?).)*'))[0] //remove parameters string
            .replace(/^\//, '').replace(/\/$/, '') //remove start and end '/' symbol
            .split('/').join(pathModule.sep); //set os separator
    };

    return {
        get : get,
        store : store,
        storeOnDisk : storeOnDisk,
        remove : remove
    }
};

module.exports.localIp = function(){
    var ifaces=os.networkInterfaces();
    var ip;

    for (var dev in ifaces) {
        ifaces[dev].forEach(function(details){
            if (details.family=='IPv4') {
                ip = details.address;
                return;
            }
        });
    }
    return ip;
};