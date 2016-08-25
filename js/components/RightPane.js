var React = require('react');
var MessageComponent = require('./MessageComponent');
var messagefrom;
var messagesubject;
var messagedate;
var marray = [];
console.log("right panel");
var RightPane = React.createClass({

  render: function(){
    var mdata = this.props.rdata.map(
      function(e,l){
    for(i=0;i<e.payload.headers.length;i++){
      if(e.payload.headers[i].name === "From")
      {
        messagefrom = e.payload.headers[i].value;

        }
      if(e.payload.headers[i].name == 'Subject')
      {
        messagesubject = e.payload.headers[i].value;
      }
      if(e.payload.headers[i].name == 'Date')
      {
        messagedate = e.payload.headers[i].value;
      }
      }
    return(
      <MessageComponent from={messagefrom} subject={messagesubject} date={messagedate}/>
    )
  });

    return (
      <div>
          {mdata}
          </div>
    )
  }
})

module.exports = RightPane;
