var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var groupModel = mongoose.model('Group');

module.exports = function (socket, config) {
    var log = require(config.root+'./setup/log.js').appLogger;
    var userId = socket.decoded_token.sub;

    socket.on("groupCreate", function(doc, callback){
        groupModel.create(doc, function(error, createdDoc){
        //log.info("Created page info "+createdPage._id);
        if(error) return callback(error, null);
        callback(error, createdDoc);
        });
    });
    socket.on("groupUpdate", function(id, doc, callback){
        groupModel.findByIdAndUpdate(id, doc, function(error, createdDoc){
        //log.info("Created page info "+createdPage._id);
        if(error) return callback(error, null);
        callback(error, createdDoc);
        });
    });
    socket.on("findPlayers", function(query, fields, callback){
        userModel.find(query, fields, callback);
    });
    socket.on("findGroups", function(query, fields, callback){
        groupModel.find(query, fields, callback);
    });
    socket.on("addMatch", function(matchInfo, groupId, callback){
        groupModel.findById(groupId, function(error, group){
        if(error) return callback(error);
        group.matchList.push(matchInfo);
        group.save(function(error){
        if(error) return callback(error);
        else return callback(null);
        });
        });
    });
    socket.on("groupFindById", function(id, fields, callback){
        groupModel.findById(id, fields, callback);
    });
}



