var Banner = React.createClass({
    onRefreshClick: function(event){
        AppDispatcher.dispatch({
            eventName: 'reload'
        })
    },
    render: function() {
        return (
            <div className="navbar navbar-warning">
                <div className="navbar-header">
                    <a className="navbar-brand aactive">React News</a>
                </div>
                <a className="btn-refresh btn btn-raised btn-info fa fa-refresh"
                    onClick={this.onRefreshClick}>
                    <div class="ripple-container"></div>
                </a>    
            </div>
        );
    }
});