var mongoose = require('mongoose');
var userModel = mongoose.model('ksuser');
var groupModel = mongoose.model('ksgroup');

module.exports = function (socket, config, schemaInfo) {
    var log = require(config.root+'./setup/log.js').appLogger;
    var userId = socket.decoded_token.sub;
    var modelBaseName = schemaInfo.modelBaseName;
    var schema = schemaInfo.schema;
    var getModel = function(playerId){
        var modelName = modelBaseName+"_"+playerId;
        mongoose.model(modelName, schema);
        return mongoose.model(modelName);
    }

    socket.on("getMessages", function(callback){
        var UserMessageModel = getModel(userId);
        UserMessageModel.find({}, function(err, docs) {
        if (err) return callback(err, null);
        else return callback(null, docs);
        });
    });
    socket.on("deleteMessage", function(id, callback){
        var UserMessageModel = getModel(userId);
        UserMessageModel.findByIdAndRemove(id, function(err, doc) {
        //log.info("Deleted Message"+id+" "+err+" "+doc);
        if (err) return callback(err);
        else return callback(null);
        });
    });

    var updateMessageToPlayers = function(group, message, callback){
        var numPlayersToBeUpdated = group.playerList.length;
        log.info("Message: Group "+JSON.stringify(group)+
            " Message "+JSON.stringify(message));
        var addMessage = function(){
            if(!numPlayersToBeUpdated) return callback(null);
            else{
                var playerId = group.playerList[numPlayersToBeUpdated-1].playerId;
                var UserMessageModel = getModel(playerId);
                UserMessageModel.create(message,function(error){
                if(error) return callback(error);
                numPlayersToBeUpdated--;
                addMessage();
                })
            }
        }
        addMessage();
    }

    socket.on("groupCreate", function(groupInfo, callback){
        groupModel.create(groupInfo, function(error, createdGroup){
        var message = {
            groupId:createdGroup._id,
            application:"Group",
            eventInfo:"Create",
            data:createdGroup
        };

        // Update the create event to all the players in group
        updateMessageToPlayers(createdGroup, message, callback);
        });
    });
    socket.on("groupUpdate", function(id, doc, callback){
        groupModel.findByIdAndUpdate(id, doc, function(error, updatedGroup){
        var message = {
            groupId:updatedGroup._id,
            application:"Group",
            eventInfo:"Update",
            data:updatedGroup
        };

        // Update the create event to all the players in group
        updateMessageToPlayers(updatedGroup, message, callback);
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
        var message = {
            groupId:groupId,
            application:"Match",
            eventInfo:"Create",
            data:matchInfo
        };

        // Update the create event to all the players in group
        updateMessageToPlayers(group, message, callback);
        });
    });
    socket.on("groupFindById", function(id, fields, callback){
        groupModel.findById(id, fields, callback);
    });
}

/*  var modelBaseName = schemaInfo.modelBaseName;
    var schema = schemaInfo.schema;
    var getModelName = function(playerId){
        return playerId+"_"+modelBaseName;
    }
    var getModelName = function(playerId){
        return playerId+"_"+modelBaseName;
    }

    socket.on("groupCreate", function(doc, callback){
        // Create a group in each of the user GroupList DB
        var groupList = [];
        for(var i in doc.playerList){
            var playerId = doc.playerList[i].playerId;
            var model = mongoose.model(getModelName(playerId), schema);
            var groupToBeSaved = new model(doc);
            groupList.push(groupToBeSaved);
        }
        // save each group with group Id stored in the player list
        for(var j in groupList){
            var group = groupList[j];
            for(var i in groupList){
                group.playerList[i].groupId = groupList[i]._id;
            }
        }
        // Save all the documents
        var total = groupList.length;
        function saveAll(){
            var doc = groupList.pop();
            doc.save(function(err, saved){
                if (err) callback(err);//handle error
                //result.push(saved[0]);
                if (--total) saveAll();
                else callback(null);
            })
        }
        saveAll();
    }); */



