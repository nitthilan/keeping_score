var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var playerInfoSchema =
    new mongoose.Schema({playerId:ObjectId,displayName:String,teamName:String,isAdmin:Boolean});
var groupSchema = new mongoose.Schema({
    name:String,
    playerList:[playerInfoSchema],
    tagList:[String]
});
// Model common to all users
mongoose.model('ksgroup', groupSchema);


