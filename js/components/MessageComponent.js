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
  render: function(){
    return (
    <tbody>
      <tr>
             <td className="col-lg-4" ><a className ="btn">{this.props.from}</a></td>
             <td className="col-lg-4"><a href="#myModal" data-toggle="modal"  id="modal" onClick={this.change1}>{this.props.subject}</a></td>
               {this.state.status?<ModalWindow a={this.props.from} b={this.props.subject} c={this.props.date} d={this.props.encodedBodyToChild}/>: null}
             <td className="col-lg-4"><a className ="btn">{this.props.date}</a></td>
      </tr>
      </tbody>

    )
  }

})

module.exports = MessageComponent
