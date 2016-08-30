var React = require('react');
var ReactDOM = require('react-dom');
var {browserHistory,Route,Router,IndexRoute}= require('react-router');
var LeftPane = require('./components/LeftPane');
var GmailBox = require('./components/GmailBox');
var Home = require('./components/Home');
var About = require('./components/About');
var NavBar = require('./components/NavBar');


var MainComponent = React.createClass({

  render: function(){
    return (
          <div className="container">
            <NavBar />
            <br/><br/><br/>
              {this.props.children}
          </div>
    )
  }
})


ReactDOM.render(<Router history={browserHistory}>
                    <Route path="/" component={MainComponent}>
                      <IndexRoute component={Home}/>
                      <Route path="/home" component={Home}/>
                      <Route path="/about/:aboutName" component={About}/>
                      <Route path="/gmailbox" component={GmailBox}/>
                    </Route>
                </Router>
  , document.getElementById('app'));
