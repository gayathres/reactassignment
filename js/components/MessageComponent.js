var React = require('react');
var ModalWindow=require('./ModalWindow')
var MessageComponent = React.createClass({

  getInitialState: function()
    {
      return({status:false});
    },
    change1:function(){
    this.setState({status:true});
  },
    change2: function(){
      this.setState({status:false});
      console.log(this.state.status);
    },
  render: function(){
    return (
    <tbody>
    <a className="col-lg-12" href="#myModal" data-toggle="modal"  id="modal" onClick={this.change1}>
      <tr id="messageinfo">
             <td className="col-lg-4" id="RightFrom">{this.props.from}</td>
             <td className="col-lg-4" id="RightSubject">{this.props.subject}</td>
             <td className="col-lg-4" id="Rightdate">{this.props.date}</td>
      </tr>
    </a>
        {this.state.status?<ModalWindow closeModal= {this.change2} a={this.props.from} b={this.props.subject} c={this.props.date} d={this.props.encodedBodyToChild} e={this.props.id}/>: null}

      </tbody>

    )
  }

})

module.exports = MessageComponent
