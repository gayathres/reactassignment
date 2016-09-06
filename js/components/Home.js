var React=require('react');
var ReactDOM = require('react-dom');
var MessageComponent = require('./MessageComponent');
var finaldata;
var finalarray=[];
var messages;
var Home=React.createClass({

  getInitialState: function()
  {
    return({messagesdata:[]});
  },

  componentDidMount: function(){
    console.log("inside component Did mount");
    $.ajax({
     url: '/gmailbox',
     dataType: 'JSON',
     type: 'GET',
     success: function(data)
     {
        this.setState({messagesdata:data});
     }.bind(this),
     async: false,
     error: function(xhr, status, err) {

       console.error(err.toString());
     }.bind(this)
  });
  //document.getElementById("data").innerHTML= {messages};
  },


  render: function()
  {
    var messages=this.state.messagesdata.map(function(data){
      console.log(data.msgfrom);
        return(<MessageComponent id ={data._id} from={data.msgfrom} subject={data.msgsubject} date={data.msgdate} encodedBodyToChild={data.msgbody}/>);

    });
    return(
      <div className="container-fluid col-lg-12">
        <div className="row">
          <div className="col-lg-12">
            <h2>React</h2>
            <p>This App is build using <mark><strong>React framework given by facebook</strong></mark>. React is used to create "Single Page Application".<br/><br/>
             It increases the performance of app using <strong>Virtual Dom,components</strong> etc..</p><br/>
            <p>Gmail functionality is implemented by using Gmail API</p>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h1>CRUD Operation using Mongo DB</h1>
              </div>
            </div>

            <div className="row">
            <table className="table table-hover table-striped col-lg-12">
              {messages}
            </table>
              </div>


        </div>
    </div>
    )
  }
})

module.exports=Home
