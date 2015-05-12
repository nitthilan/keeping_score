var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var messageSchema = new mongoose.Schema({
    groupId:ObjectId,
    application:String,
    eventInfo:String,
    data:Mixed
});
// Has separate model for each user
module.exports = {schema: messageSchema, modelBaseName: "ksmessages"};
