var Horn = require('./horn');

var Horns = function(){

};

Horns.prototype = {
    makeRequest: function(url, callback){
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('load', callback);
        request.send();
    },
    all: function(callback){
        this.makeRequest('http://localhost:3000/api/horns', function(){
        if(this.status !== 200){
            return;
        };
        var jsonString = this.responseText;
        var results = JSON.parse(jsonString);
        
        var horns = Horns.prototype.populateHorns(results);
        callback(horns);
        });
    },
    populateHorns: function(results){
        var horns = [];
        for(var result of results){
            var horn = new Horn(result);
            horns.push(horn);
        };
        return horns;
    },
};

module.exports = Horns;