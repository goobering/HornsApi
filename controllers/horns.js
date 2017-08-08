var express = require('express');
var app = express();
var hornRouter = express.Router();

var Horn = require('../client/src/models/horn');

var HornQuery = require('../client/db/hornQuery');
var query = new HornQuery();

hornRouter.get('/:id', function(req, res){
    res.json(horns[req.params.id]);
});

hornRouter.get('/', function(req, res){
    query.all(function(results){
        res.json(results);
    });
});

module.exports = hornRouter;