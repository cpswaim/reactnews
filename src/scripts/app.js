var ReactNews = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        var me = this,
            api = new NewsService();

        $('.loadmask.modal').show();
        api.getArticleList(0, 10).then(function(articles){
            $('.loadmask.modal').hide();
            me.setState({data: articles});
            //Init material ripples and jQuery effects after render
            $.material.init();
        });
    },
    render: function() {
        return (
            <div className="application container">
                <LoadMask />
                <Banner />
                <ArticleList data={this.state.data} />
            </div>
        );
    }
});

document.addEventListener("DOMContentLoaded", function(event) {
    React.render(
        <ReactNews />,
        document.getElementById('content')
    );
})