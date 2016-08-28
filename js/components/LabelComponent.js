var React = require('react');

var LabelComponent = React.createClass({

  handleClick: function(d){
    console.log('labelid'+this.props.labelid);
    this.props.lf(this.props.labelid);
  },

  render: function(){
    return (
      <div>
      <button className = "btn btn-link" onClick ={this.handleClick}>{this.props.labelname}</button>
      </div>
    )
  }
})

module.exports = LabelComponent;
