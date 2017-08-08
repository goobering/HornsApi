/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(1);

var app = function() {
  new UI();
}

window.addEventListener('load', app);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Horns = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Horn = __webpack_require__(3);

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Horn = function(options){
    this.name = options.name;
    this.description = options.description;
    this.price = options.price;
    this.image_url = options.image_url;
    this.audio_url = options.audio_url;
}

module.exports = Horn;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map