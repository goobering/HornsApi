var MongoClient = require('mongodb').MongoClient;

var HornQuery = function(){
    this.url = 'mongodb://localhost:27017/horn_db';
};

HornQuery.prototype = {
    all: function(callback){
        MongoClient.connect(this.url, function(err, db){
            var collection = db.collection('horns');
            collection.find().toArray(function(err, result){
                callback(result);
            });
        });
    }
}

module.exports = HornQuery;