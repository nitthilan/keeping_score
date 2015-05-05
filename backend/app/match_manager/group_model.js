var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;


var gameInfo = {scoreList:[Number], winner:Number};
var setInfo = {gameList:[gameInfo], winner:Number, summary:[Number]};
var scoreInfo = {setList:[setInfo], winner:Number, summary:[Number]};
var playerInfoSchema =
    new mongoose.Schema({playerId:ObjectId,displayName:String,teamName:String,isAdmin:Boolean});
var groupSchema = new mongoose.Schema({
    name:String,
    playerList:[playerInfoSchema],
    tagList:[String],
    matchList:[{
        sideInfo:Mixed,
        scoreInfo:scoreInfo,
        tagList:[String],
        date: Date
    }]
});

//module.exports = {schema: groupSchema, modelBaseName: "groups"};
var Group = mongoose.model('Group', groupSchema);


