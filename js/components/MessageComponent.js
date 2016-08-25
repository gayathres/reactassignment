var React = require('react');

var MessageComponent = React.createClass({

  render: function(){
    return (
      <div>
      <table className="fixed">
        <tr>
          <td><a href="#">{this.props.from}</a></td>
          <td>{this.props.subject}</td>
          <td>{this.props.date}</td>
        </tr>
      </table>
      </div>
    )
  }
})

module.exports = MessageComponent;
