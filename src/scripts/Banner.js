var Banner = React.createClass({
    render: function() {
        return (
            <div className="navbar navbar-warning">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-warning-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="javascript:void(0)">React News</a>
                </div>
            </div>
        );
    }
});