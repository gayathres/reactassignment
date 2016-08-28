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
    console.log(this.state.modalIsOpen);
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
      <div>
        <div>
          <a className= "btn btn-success" onClick={this.openModal} id="composebutton">Compose Mail</a>
            {this.state.modalIsOpen ? <Modal modalIsOpen={this.state.modalIsOpen} /> : null}

          </div>
          {label}
      </div>
    );
  }
})

module.exports = LeftPane;
