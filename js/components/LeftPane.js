var React = require('react');
var LabelComponent = require('./LabelComponent');

var LeftPane = React.createClass({

  render: function(){
    var label = this.props.ldata.map(
      function(l){
        return (
        <LabelComponent labelid={l.id} labelname={l.name} />
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
