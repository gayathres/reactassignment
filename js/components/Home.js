var React=require('react');

var Home=React.createClass({
  render: function()
  {
    return(
      <div className="container-fluid col-lg-12">
        <div className="row">
          <div className="col-lg-12">
            <h2>React</h2>
            <p>This App is build using <mark><strong>React framework given by facebook</strong></mark>. React is used to create "Single Page Application".<br/><br/>
             It increases the performance of app using <strong>Virtual Dom,components</strong> etc..</p><br/>
            <p>Gmail functionality is implemented by using Gmail API</p>
            </div>
        </div>
    </div>
    )
  }
})

module.exports=Home
