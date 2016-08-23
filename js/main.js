var React = require('react');
var ReactDOM = require('react-dom');
var LeftPane = require('./components/LeftPane');
var GmailBox = require('./components/GmailBox');

var MainComponent = React.createClass({

  render: function(){
    return (
          <div className="container">
            <GmailBox />
          </div>
    )
  }
})


ReactDOM.render(<MainComponent />, document.getElementById('app'));
