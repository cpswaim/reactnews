var Banner = React.createClass({
    onRefreshClick: function(event){
        AppDispatcher.dispatch({
            eventName: 'reload'
        })
    },
    onTitleClick: function(event){
        AppDispatcher.dispatch({
            eventName: 'home'
        })
    },
    render: function() {
        return (
            <div className="navbar navbar-warning">
                <div className="navbar-header">
                    <a className="navbar-brand active title"
                        onClick={this.onTitleClick}>React News</a>
                </div>
                <a className="btn-refresh btn btn-raised btn-info fa fa-refresh"
                    onClick={this.onRefreshClick}>
                    <div className="ripple-container"></div>
                </a>    
            </div>
        );
    }
});