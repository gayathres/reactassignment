var React=require('react');
var Modal = require('react-modal');

var ModalWindow=React.createClass({

  appendToIframe: function(message)
  {
   var iFrameNode = this.refs.myIframe,
   frameDoc = iFrameNode.contentWindow.document;
   frameDoc.write(message);
  },

 getInitialState: function() {
   return { modalIsOpen: false,to: '', subject: '',messagebody: '' };
 },
 openModal: function() {
   this.setState({modalIsOpen: true});
 },
 closeModal: function() {
   this.setState({modalIsOpen: false});
 },
 handleModalCloseRequest: function() {
   // opportunity to validate something and keep the modal open even if it
   // requested to be closed
   this.setState({modalIsOpen: false});
 },
 handleSaveClicked: function() {
   var accessToken = localStorage.getItem('gToken');
   console.log("Access token: "+accessToken);
   var email = '';
   var Headers = {'To': this.state.to,'Subject': this.state.subject};
   for(var header in Headers)
   {
     email += header += ": "+Headers[header]+"\r\n";
     console.log("email---"+email);
     console.log("header---"+header);
     console.log("Headers[header]---"+Headers[header]);
 }
   email += "\r\n" + this.state.messagebody;
   console.log("constructed email: " +email);
   var encodedMessage =  window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_');
   $.ajax({
    url: 'https://www.googleapis.com/gmail/v1/users/me/messages/send?key={AIzaSyAM1J8nRheoY_O5pPwiXZRuDEgBMkWq0OQ}',
    dataType: 'json',
    contentType: "application/json",
    type: 'POST',
    data: JSON.stringify({'raw' : encodedMessage}),
    beforeSend: function (request)
    {
      request.setRequestHeader("Authorization", "Bearer "+accessToken);
    },
    success: function(data)
    {
      console.log("success enters");
      alert("Mail Sent");
      this.setState({modalIsOpen: false,to: '', subject: '',messagebody: ''});

    }.bind(this),
    async: false,
    error: function(xhr, status, err) {

      console.error(err.toString());
    }.bind(this)
 });


 },

 handleToChange: function(e) {
     this.setState({to: e.target.value});
   },
   handleSubjectChange: function(e) {
     this.setState({subject: e.target.value});
   },
   handleMessagebodyChange: function(e) {
     this.setState({messagebody: e.target.value});
   },


  render:function(){
  return(
    <div>
    <div className="modal fade" id="myModal">
    <div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header">
      <input className="form-control" id="subject" type="text" value={this.props.b} onChange={this.handleToChange}></input>

      <button className="close" data-dismiss="modal">X</button>
    </div>
      <div className="modal-body">
        <form  className="form-horizontal">
          <div className="form-group">
            <div className="col-lg-12">
              <input className="form-control" id="from" type="email" value={this.props.a} onChange={this.handleToChange}></input>
              <button className="btn btn-link pull-right" onClick={this.modalIsOpen}>Reply</button>
              <Modal
              className="ModalClass"
              overlayClassName="OverlayClass"
              closeTimeoutMS={150}
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.handleModalCloseRequest}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" onClick={this.handleModalCloseRequest}>

                    <span className="sr-only">Close</span>
                  </button>
                  <h4 className="modal-title">New Message</h4>
                </div>
                <div className="modal-body">
                <form className="form-horizontal">
                  <div className="form-group">
                    <label className ="col-lg-2 control-label" htmlFor="inputName">To</label>
                    <div className="col-lg-10">
                      <input className="form-control" id="inputName" name="to" placeholder="Enter Recipient Mailid" type="text" value={this.state.to}
              onChange={this.handleToChange}></input>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-2 control-label" htmlFor="inputEmail">Subject</label>
                    <div className="col-lg-10">
                      <input className="form-control" id="inputEmail" name="subject" placeholder="Enter Subject Name" type="email" value={this.state.subject}
              onChange={this.handleSubjectChange}></input>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-lg-2 control-label" htmlFor="inputMessage">Message</label>
                    <div className="col-lg-10">
                      <textarea className="form-control" id="inputMessage" name="messagebody" placeholder="Message" rows="10" value={this.state.messagebody}
              onChange={this.handleMessagebodyChange}></textarea>
                    </div>
                  </div>
                </form>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>Send</button>
                </div>
              </div>
            </Modal>
            </div>
          </div>
          <iframe id="iframe-message" ref="myIframe" width="700px" height="400px">
              </iframe>
        </form>
      </div>
      </div>
    </div>
    </div>
  </div>
  );
},

componentDidMount: function(){
var encodedBody = this.props.d;
encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
encodedBody = decodeURIComponent(escape(window.atob(encodedBody)));
console.log(encodedBody);
this.appendToIframe(encodedBody);
},

});



module.exports=ModalWindow
