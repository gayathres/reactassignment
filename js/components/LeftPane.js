var React = require('react');
var LabelComponent = require('./LabelComponent');
var labelid;
var labelname;
console.log("Left panel");
var LeftPane = React.createClass({

  render: function(){
    var that=this;
    console.log("lfun in LeftPanel: "+that.props.lfun);
    var label = that.props.ldata.map(
      function(l){
        labelid = '';
        labelname ='';
        if(l.type == "system"){
          labelid = l.id;
          labelname = l.name;
          return (
          <LabelComponent labelid={labelid} labelname={labelname} lf={that.props.lfun} />
          )
        }
      }
    );
    return(
      <div>
      <table id = "lefttable">
      <tr>
      <td><a className = "btn btn-link">Compose Mail</a></td>
      </tr>
      <tr>
      {label}
      </tr>
      </table>
      </div>
    );
  }
})

module.exports = LeftPane;
