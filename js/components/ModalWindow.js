var React=require('react');


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
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header col-lg-12">
              <form  className="form-horizontal" id="Viewmodelheader">
                <div className="form-group">
                  <div className="col-lg-8">
                    <input className="form-control" id="from" type="text" value={this.props.a} onChange={this.handleToChange}></input>
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
                    <input className="form-control" id="subject" type="email" value={this.props.b} onChange={this.handleToChange}></input>
                  </div>
                </div>
                <iframe id="iframe-message" ref="myIframe" width="500px" height="400px">
                </iframe>
              </form>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-default" id="cancel" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" id="send" data-dismiss="modal" onClick={this.handleSaveClicked}>Reply</button>
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
