var React = require('react');

var LabelComponent = React.createClass({

  render: function(){
    return (
      <div>
      <a href = {this.props.labelid}>{this.props.labelname}</a>
      </div>
    )
  }
})

module.exports = LabelComponent;
