

  var _         = require( 'underscore'             ); 
 
  var Component = require( 'wombs-audio-component'  );
  var Texture   = require( 'wombs-audio-texture'    );
  
  var mutate = {};

  mutate.detect = function(){
      
      navigator.getUserMedia =  
        navigator.getUserMedia        || 
        navigator.webkitGetUserMedia  || 
        navigator.mozGetUserMedia;

      if( !navigator.getUserMedia ){
        this.onError( 'NO USER MEDIA' );
      }

  }

  mutate.beginLoad = function(){}
  mutate.endLoad = function(){}

  mutate.successCallback = function( stream ){
   
    console.log( 'stream succeed' );
    this.source = this.ctx.createMediaStreamSource( stream );
    this.import( this.source );

    console.log( this.ctx );

  }
  
  mutate.errorCallback = function(){
    this.onError( 'Stream Failed' );
  }


  UserAudio.prototype.onError = function( string ){

    console.log( string );

  }


  UserAudio.prototype = _.extend( 
    Component.prototype,
    mutate
  );

  function UserAudio( controller , params ){

    Component.call( this , controller );

    this.params = _.defaults( params || {} , {

      fbc:      2048,
      texture: true,
      analyser: true,

    });

    this.detect();    

    var constraints = { audio:true }
    
    navigator.getUserMedia( 
      constraints , 
      this.successCallback.bind( this ) , 
      this.errorCallback.bind( this )
    );


    if( this.params.analyser || this.params.analyser ){
      this.createAnalyser( this.params.fbc );
    }

    if( this.params.texture ){
      this.createTexture( this.analyser );
    }

  }




  module.exports = UserAudio;
