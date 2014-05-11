

  var _ = require( 'underscore' ); 

  var Texture = require( 'wombs-audio-texture' );
  var Component = require( 'wombs-component' );
  
  UserAudio.prototype = new Component();
  
  function UserAudio( controller ){

    this._init();

    
    this.detect();
    
    this.controller = controller;
    

    var constraints = { audio:true }
    
    this.getUserMedia( 
      constraints , 
      this.successCallback.bind( this ) , 
      this.errorCallback.bind( this )
    );



  }

  UserAudio.prototype.detect = function(){

      
    try(){
      this.getUserMedia =  
        navigator.getUserMedia        || 
        navigator.webkitGetUserMedia  || 
        navigator.mozGetUserMedia;
    }catch( e){
      this.onError( 'No User Media' ); 
    }


  }

  UserAudio.prototype.beginLoad = function(){}
  UserAudio.prototype.endLoad = function(){}

  UserAudio.

  UserAudio.prototype.onError = function( string ){

    console.log( string );

  }
  
  module.exports = UserAudio;
