var React=require('react');

var About=React.createClass({
  render: function()
  {
    return(
      <div className="container-fluid col-lg-12">
        <div className="row">
          <div className="col-lg-12">
            <p><strong>About {this.props.params.aboutName}</strong></p><br/><br/>
            <p>This is developed for React Assignment in MERN Wave Course</p>

            </div>
        </div>
    </div>
    )
  }
})

module.exports=About
