var mongoose = require('mongoose');


var gameInfo = {scoreList:[Number], winner:Number};
var setInfo = {gameList:[gameInfo], winner:Number, summary:[Number]};
var scoreInfo = {setList:[setInfo], winner:Number, summary:[Number]};
var playerInfo = {playerId:ObjectId,displayName:String,teamName:String};
var groupSchema = new mongoose.Schema({
    name:String,
    playerList:[{type:ObjectId}],
    tagList:[String],
    matchList:[{
        sideInfo:[[playerInfo]],
        scoreInfo:scoreInfo,
        tagList:[String],
        date: Date
    }]
});

var Group = mongoose.model('Group', groupSchema);
