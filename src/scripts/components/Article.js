var Article = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading" >
                            {this.props.number}.&nbsp;
                            <a href={this.props.url}>
                                {this.props.title}
                            </a>
                        </div>
                        <div className="panel-body">{this.props.score} points by&nbsp;
                            <a href={"https://news.ycombinator.com/user?id="+this.props.by}>{this.props.by}</a>&nbsp;
                            |&nbsp;
                            <a href={"https://news.ycombinator.com/item?id="+this.props.articleId}>comments</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});