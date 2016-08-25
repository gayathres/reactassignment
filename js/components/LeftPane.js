var React = require('react');
var LabelComponent = require('./LabelComponent');
var labelid;
var labelname;
console.log("Left panel");
var LeftPane = React.createClass({

  render: function(){
    var label = this.props.ldata.map(
      function(l){
        labelid = '';
        labelname ='';
        if(l.type == "system"){
          labelid = l.id;
          labelname = l.name;
        }
console.log("labelid::::"+labelid);
        return (
        <LabelComponent labelid={labelid} labelname={labelname} />
        )
      }
    );
    return(
      <div>
      {label}
      </div>
    );
  }
})

module.exports = LeftPane;
