var React = require('react');
var LabelComponent = require('./LabelComponent');
var Modal = require('./ComposeModel');
var labelid;
var labelname;
console.log("Left panel");
var LeftPane = React.createClass({

  getInitialState: function(){
        return ({modalIsOpen: false})
    },
  openModal: function() {
    this.setState({modalIsOpen: true});
    },
  closeModal: function() {
      this.setState({modalIsOpen: false});
      },

  render: function(){
    var that=this;
    console.log("lfun in LeftPanel: "+that.props.lfun);
    var label = that.props.ldata.map(
      function(l){
        labelid = '';
        labelname ='';
        if(l.id == "INBOX" || l.id == "SENT" || l.id == "IMPORTANT" ||
        l.id == "CHAT" || l.id == "TRASH" || l.id == "DRAFT" || l.id == "SPAM" || l.id == "STARRED" || l.id == "UNREAD"){
          labelid = l.id;
          labelname = l.name;
          return (<LabelComponent labelid={labelid} labelname={labelname} lf={that.props.lfun} />)
        }
      }
    );
    return(
      <div id="LeftPane">
        <div>
          <a className= "btn btn-success" href="#composeModel" onClick={this.openModal} id="composebutton" data-toggle="modal">Compose Mail</a>
          {this.state.modalIsOpen?<Modal closeModal={this.closeModal} /> : null}
        </div>
          {label}
      </div>
    );
  }
})

module.exports = LeftPane;
