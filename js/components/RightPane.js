var React = require('react');
var MessageComponent = require('./MessageComponent');
var messagefrom;
var messagesubject;
var messagedate;
var marray = [];
console.log("right panel");
var RightPane = React.createClass({

  getHTMLPart: function(arr){
       for(var x = 0; x <= arr.length; x++) {
         if(typeof arr[x].parts === 'undefined') {
           if(arr[x].mimeType === 'text/html') {
             return arr[x].body.data;
           }
         }
         else{
           return this.getHTMLPart(arr[x].parts);
         }
       }
       return '';
     },

  render:function(){
  var that=this;
  var InboxMail=this.props.rdata.map(function(mail){
    if(typeof mail.payload.parts === 'undefined')      {
        encodedBody = mail.payload.body.data;
      }
      else{
        encodedBody = that.getHTMLPart(mail.payload.parts);
      }

       for(var i=0;i<mail.payload.headers.length;i++){
          if(mail.payload.headers[i].name=="From"){
              messagefrom=mail.payload.headers[i].value;
          }
          if(mail.payload.headers[i].name=="Subject"){
              messagesubject=mail.payload.headers[i].value;
          }
          if(mail.payload.headers[i].name=="Date"){
              messagedate=mail.payload.headers[i].value;
          }
        }

      return(<MessageComponent from={messagefrom} subject={messagesubject} date={messagedate} encodedBodyToChild={encodedBody}/>);

  });

    return (
      <div className="col-lg-10">
      <table className="table table-hover col-lg-10">
                    {InboxMail}
      </table>
        </div>
    )
  }
})

module.exports = RightPane;
