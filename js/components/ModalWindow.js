var React=require('react');
var encodedBody;

var ModalWindow=React.createClass({


  appendToIframe: function(message)
  {
   var iFrameNode = this.refs.myIframe,
   frameDoc = iFrameNode.contentWindow.document;
   frameDoc.write(message);
  },

   getInitialState: function() {
     return {mfrom:this.props.a, msub:this.props.b,mdate:this.props.c,mbody:this.props.d};
   },

   handleFromChange: function(e) {
     this.setState({mfrom: e.target.value});
   },
   handleSubjectChange: function(e) {
     this.setState({msub: e.target.value});
     console.log(msub);
   },
   handleMessagebodyChange: function(e) {
     this.setState({mbody: e.target.value});
   },
   handleMessageDateChange: function(e) {
     this.setState({mdate: e.target.value});
   },

    handleSaveClicked: function(){
     var mfrom=this.props.a;
     var msub=this.props.b;
     var encodedBody = this.props.d;
     var mdate=this.props.c;
     var mbody=encodedBody;
     $.ajax({
      url: '/gmailbox',
      dataType: 'json',
      contentType: "application/json",
      type: 'POST',
      data: JSON.stringify({"msgfrom":mfrom,"msgsubject":msub,"msgbody":mbody,"msgdate":mdate}),
      success: function(data)
      {
        console.log("success enters");
        console.log(data);
        alert("Message saved successfully");
      }.bind(this),
      async: false,
      error: function(xhr, status, err) {

        console.error(err.toString());
      }.bind(this)
   });

   },

   handleUpdateClicked: function(){
     var mfrom=this.state.mfrom;
     var msub=this.state.msub;
     var mbody=encodedBody;
     var mdate=this.state.mdate;
     var id=this.props.e;
     //console.log(this.props.e);
     //console.log(mbody);
     //console.log({"msgfrom":mfrom,"msgsubject":msub,"msgbody":mbody,"msgdate":mdate,"_id":id});
     $.ajax({
      url: '/gmailbox',
      dataType: 'JSON',
      type: 'PUT',
      data: {"msgfrom":mfrom,"msgsubject":msub,"msgbody":mbody,"msgdate":mdate,"_id":id},
      success: function(data)
      {
        console.log("Inside updatedata:");
        alert("Msg updated Successfully");
        }.bind(this),
      async: false,
      error: function(xhr, status, err) {

        console.error(err.toString());
      }.bind(this)
   });

   },

   handleDeleteClicked: function(){
     var id=this.props.e;
     console.log(this.props.e);
     var data1= JSON.stringify({"_id":id})
     console.log(data1);
     $.ajax({
      url: '/gmailbox',
      dataType: 'TEXT',
      type: 'DELETE',
      data: {"_id":id},
      success: function(data)
      {
        console.log("Inside Deletedata:");
        alert("Msg Deleted Successfully");
        }.bind(this),
      async: false,
      error: function(xhr, status, err) {

        console.error(err.toString());
      }.bind(this)
   });

   },

   handleReplyClicked: function() {
     var accessToken = localStorage.getItem('gToken');
     console.log("Access token: "+accessToken);
     var email = '';
     var Headers = {'To': this.state.mfrom,'Subject': this.state.msub};
     for(var header in Headers)
     {
       email += header += ": "+Headers[header]+"\r\n";
       console.log("email---"+email);
       console.log("header---"+header);
       console.log("Headers[header]---"+Headers[header]);
   }
     email += "\r\n" + this.state.mbody;
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


  render:function(){
  return(
    <div>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header col-lg-12">
              <form  className="form-horizontal" id="Viewmodelheader">
                <div className="form-group">
                  <div className="col-lg-8">
                    <input className="form-control" id="from" type="email" value={this.state.mfrom} onChange={this.handleFromChange}></input>
                  </div>
                  <div className="col-lg-4">
                    <button className="close pull-right" data-dismiss="modal" onClick={this.props.closeModal}>X</button>
                  </div>
              </div>
            </form>
            </div>
            <div className="modal-body col-lg-12">
              <form  className="form-horizontal">
                <div className="form-group">
                  <div className="col-lg-12">
                    <input className="form-control" id="subject" type="text" value={this.state.msub} onChange={this.handleSubjectChange}></input>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-12">
                    <input className="form-control" id="date" type="text" value={this.state.mdate} onChange={this.handleMessageDateChange}></input>
                  </div>
                </div>
                <iframe id="iframe-message" ref="myIframe" width="500px" height="400px">
                </iframe>
              </form>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-default" id="save" data-dismiss="modal" onClick={this.handleDeleteClicked}>Delete</button>
            <button type="button" className="btn btn-default" id="save" data-dismiss="modal" onClick={this.handleUpdateClicked}>Update</button>
            <button type="button" className="btn btn-default" id="save" data-dismiss="modal" onClick={this.handleSaveClicked}>Save</button>
            <button type="button" className="btn btn-primary" id="send" data-dismiss="modal" onClick={this.handleReplyClicked}>Reply</button>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
},

componentDidMount: function(){
encodedBody = this.state.mbody;
encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
encodedBody = decodeURIComponent(escape(window.atob(encodedBody)));
this.appendToIframe(encodedBody);
},

});



module.exports=ModalWindow;
