'use strict'; // right?
var mongoose = require('mongoose');
var db = require('../server.js')

var Schema = mongoose.Schema;

var algorithmSchema = new Schema({

  prompt: {
    type: String, 
  }, 

  pointValue: {
    type: Number, 
  }, 

  levelRequired: {
    type: Number, 
  }, 

  seedCode: {
    type: String,
  }, 

  // will need to use gridFS for this if the profile
  // pictures are going to be larger than 16mb in size. 
  // need to do more research to see if this will actually work. 
  testingSuite: {
    data: Buffer, 
    contentType: String 
  }, 

  // skeleton for submissionHistory: 

  submissionHistory: {
    type: Array, 
  }, 

});

mongoose.model('algorithmSchema', algorithmSchema);