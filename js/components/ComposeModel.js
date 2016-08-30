var React = require('react');

var ComposeModel = React.createClass({

  getInitialState: function() {
    return {modalIsOpen: true, to: '', subject: '',messagebody: '' };
  },
  openModal: function() {
  this.setState({modalIsOpen: true});
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
       this.setState({to: '', subject: '',messagebody: ''});

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
  render: function(){
    return(
      <div>
        <div className="modal" id="composeModel">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button className="close" data-dismiss="modal">X</button>
                <h3 className="modal-title">New Message</h3>
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
                  <div class="form-group">
                  <div class="col-lg-offset-2 col-lg-10">
                    <span class="btn green fileinput-button">
                      <input type="file" name="files[]" multiple=""/>
                    </span>
                  </div>
                </div>

                <button type="button" className="btn btn-default" id="cancel" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" id="send" data-dismiss="modal" onClick={this.handleSaveClicked}>Send</button>
              </div>
              </div>
            </div>
          </div>
  </div>
    );
  }
})

module.exports = ComposeModel;
