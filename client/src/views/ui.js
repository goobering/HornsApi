var Horns = require('../models/horns');

var UI = function() {
    var horns = new Horns();
    horns.all(function(result){
        UI.prototype.render(result);  
    });
};

UI.prototype = {
    createText: function(text, label) {
        var p = document.createElement('p');
        p.innerText = label + text;
        return p;
    },

    appendText: function(element, text, label) {
        var pTag = this.createText(text, label);
        element.appendChild(pTag);
    },
    appendImg: function(element, image_url){
        var img = document.createElement('img');
        img.src = image_url;
        element.appendChild(img);
    },
    appendAudio: function(element, audio_url){
        var audio = document.createElement('audio');
        audio.src = audio_url;
        audio.autoplay = false;
        audio.controls = 'controls';
        element.appendChild(audio);
    },
    render: function(horns) {
        var container = document.getElementById('horn-list');

        for (var horn of horns) {
        var li = document.createElement('li');
        this.appendText(li, horn.name, 'Name: ');
        this.appendText(li, horn.description, 'Description: ');
        this.appendImg(li, horn.image_url);
        this.appendAudio(li, horn.audio_url);
        container.appendChild(li);
        }
    }
}

module.exports = UI;
