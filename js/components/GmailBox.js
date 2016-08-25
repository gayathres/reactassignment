var React = require('react');
var LeftPane = require('./LeftPane');
var RightPane = require('./RightPane');
var loadedData = false;
var loadedMessages = false;
var loadedSpecificMessages = false;
var messagearray = [];

var GmailBox = React.createClass({
 getInitialState: function()
   {
     return({allLabelsData:[],allmessagesData:[],messagesData:[],labelType: "INBOX"});
   },


 gmailLogin: function()
 {
   var acToken, tokenType, expiresIn;
   var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
   var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly';
   var CLIENTID    =   '446684075533-gbninaa3l244hi99u104q06t94kvnrkl.apps.googleusercontent.com';
   var REDIRECT    =   'http://localhost:8080';
   var TYPE        =   'token';
   var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
   var win         =   window.open(_url, "windowname1", 'width=800, height=600');

   var pollTimer   =   window.setInterval(function()
   {

       try
       {

           if (win.document.URL.indexOf(REDIRECT) != -1)
           {
               window.clearInterval(pollTimer);
               var url =   win.document.URL;
               acToken =   gup(url, 'access_token');
               tokenType = gup(url, 'token_type');
               expiresIn = gup(url, 'expires_in');
               localStorage.setItem('gToken',acToken);
               localStorage.setItem('gTokenType',tokenType);
               localStorage.setItem('gExprireIn',expiresIn);
               function gup(url, name) {
                   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                   var regexS = "[\\#&]"+name+"=([^&#]*)";
                   var regex = new RegExp( regexS );
                   var results = regex.exec( url );
                   if( results == null )
                       return "";
                   else
                       return results[1];
               }
               win.close();
           }
       }
       catch(e)
       {
         console.log(e);
       }
   }, 500);
   this.allLabels();
   this.allmessages(this.state.labelType);

 },

 allLabels: function()
 {
     var accessToken = localStorage.getItem('gToken');
     $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/me/labels?key={AIzaSyAM1J8nRheoY_O5pPwiXZRuDEgBMkWq0OQ}',
      dataType: 'json',
      type: 'GET',
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(data)
      {
        this.setState({allLabelsData:data.labels});
        loadedData=true;
        console.log("labeldata length"+ this.state.allLabelsData.length);
        console.log("labeldata"+ this.state.allLabelsData);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
   });

 },

 allmessages: function(labelType)
 {
     var accessToken = localStorage.getItem('gToken');
     console.log(accessToken);
     $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds='+labelType+'&maxResults=10&key={AIzaSyAM1J8nRheoY_O5pPwiXZRuDEgBMkWq0OQ}',
      dataType: 'json',
      type: 'GET',
      async: 'false',

      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },

      success: function(data)
      {

        this.setState({allmessagesData:data.messages});
        loadedMessages=true;
        console.log(this.state.allmessagesData.length);
        this.messagearray =[];
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
   });
this.allmessagesinfo();
 },

 allmessagesinfo: function()
 {
   for(i=0;i<this.state.allmessagesData.length;i++){
     var accessToken = localStorage.getItem('gToken');

     console.log(accessToken);
     $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/me/messages/'+ this.state.allmessagesData[i].id +'?key={AIzaSyAM1J8nRheoY_O5pPwiXZRuDEgBMkWq0OQ}',
      dataType: 'json',
      type: 'GET',
      async: 'false',
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(data)
      {
        messagearray.push(data);
        this.setState({messagesData:messagearray});
        loadedSpecificMessages=true;
        console.log("Messagedata length"+ this.state.messagesData.length);
        console.log("Messagedata"+ this.state.messagesData);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
   });
}
 },

 render:function()
 {
   var leftPanel;
   var rightPanel;

   if(loadedMessages){
     leftPanel =  <LeftPane ldata = {this.state.allLabelsData} lfun = {this.allmessages} />
     rightPanel= <RightPane rdata= {this.state.messagesData} />
   }

     return(
       <div className="GmailBox">
           <div className="container-fluid">

             <div className="row">
                 <div className="col-lg-1">
                  <button id="authorize-button" onClick={this.gmailLogin} className="btn btn-success pull-left">Login</button>
                  </div>
                  <div className="col-lg-8 pull-right">
                    <h2>ReactMails</h2>
                  </div>
              </div>
               <div className="row">
                 <div className="col-lg-2">
                    {leftPanel}
                  </div>
                 <div className="col-lg-10">
                 {rightPanel}
                 </div>
               </div>
         </div>
     </div>
     );
 }
 });

module.exports = GmailBox;
