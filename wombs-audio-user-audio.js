

  var _         = require( 'underscore'             ); 
  var Component = require( 'wombs-audio-component'  );
  
  var mutation = {};

  mutation.detect = function(){
      
      navigator.getUserMedia =  
        navigator.getUserMedia        || 
        navigator.webkitGetUserMedia  || 
        navigator.mozGetUserMedia;

      if( !navigator.getUserMedia ){
        this.onError( 'NO USER MEDIA' );
      }

  }

  mutation.beginLoad = function(){}
  mutation.endLoad = function(){}

  mutation.successCallback = function( stream ){
   
    console.log( 'stream succeed' );
    this.source = this.ctx.createMediaStreamSource( stream );
    this.import( this.source );

    console.log( this.ctx );

  }
  
  mutation.errorCallback = function(){
    this.onError( 'Stream Failed' );
  }


  UserAudio.prototype.onError = function( string ){

    console.log( string );

  }


  UserAudio.prototype = _.extend( 
    Component.prototype,
    mutation
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
