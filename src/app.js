var NewsService = function() {
    var me = this,
        firebaseApi = new Firebase("https://hacker-news.firebaseio.com/v0/");

    me.getTopStoriesList = function() {
        return new Promise(function(resolve, reject) {
            var endpoint = firebaseApi.child('topstories'),
                valueChange = function(response) {
                    var topStories = response.val();
                    resolve(topStories);
                    endpoint.off('value', valueChange);
                };
            endpoint.on('value', valueChange);
        });
    };

    me.getItemById = function(itemId) {
        return new Promise(function(resolve, reject) {
            var endpoint = (itemId) ? firebaseApi.child('item').child(itemId) : null,
                valueChange = function(response) {
                    var item = response.val();
                    resolve(item);
                    if (endpoint) {
                        endpoint.off('value', valueChange);
                    }
                };
            endpoint.on('value', valueChange);
        })
    };

    me.getItemsByIds = function(items){
        return new Promise(function(resolve, reject){
            var i = 0,
                itemsToResolve = [],
                itemId = null
                prms = null;

            if(items && items.length){
                for(i = 0; i < items.length; i++){
                    itemId = items[i];
                    if(itemId){
                        prms = me.getItemById(itemId);
                    }
                    if(prms){
                        itemsToResolve.push(prms);
                    }
                }
            }

            if(itemsToResolve && itemsToResolve.length){
                Promise.all(itemsToResolve).then(function(itemList){
                    resolve(itemList);
                })
            }
        })
    }

    me.getFullArticleList = function(){
        return new Promise(function(resolve, reject){
            me.getTopStoriesList().then(function(storyList){
                var prms = null;
                prms = me.getItemsByIds(storyList);
                prms.then(function(articleList){
                    resolve(articleList);
                })
            });
        });
    };

    me.getCommentTree = function(item, depth) {
        var depth = depth || 1,
            prms = null,
            itemStack = [item];

        if (item && item.kids && item.kids.length > 0) {
            return new Promise(function(resolve, reject) {

                prms = me.getItemsByIds(item.kids);
                prms.then(function(kids) {

                });
            });
        }
        else {
            return new Promise(function(resolve, reject){
                resolve(item);
            })
        }
    }

// {
//     "by": "danso",
//     "id": 9019137,
//     "kids": [9019301, 9019404, 9019417, 9019389, 9019405, 9019442, 9019207, 9019203, 9019452, 9019336, 9019321],
//     "score": 91,
//     "text": "",
//     "time": 1423440827,
//     "title": "Annotated code: Circles bouncing off lines",
//     "type": "story",
//     "url": "http://annotated-code.maryrosecook.com/circles-bouncing-off-lines/index.html"
// };
};

var Article = React.createClass({
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading" >
                    <a href={this.props.url}>
                        <h3>
                            {this.props.number}. {this.props.title}
                        </h3>
                    </a>
                </div>
                <div className="panel-body">{this.props.score} points by&nbsp;
                    <a href={"https://news.ycombinator.com/user?id="+this.props.by}>{this.props.by}</a>
                </div>
            </div>
        );
    }
});

var ArticleList = React.createClass({
    render: function() {
        var articleNodes = this.props.data.map(function(article, index) {
            //console.log(index);
            return (
                <Article
                    url={article.url}
                    title={article.title}
                    by={article.by}
                    score={article.score}
                    key={index}
                    number={index+1} />
            );
        });
        return (
            <div className="articleList">
                {articleNodes}
            </div>
        );
    }
});

var ArticleBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        var me = this,
            api = new NewsService();

        api.getFullArticleList().then(function(articles){
            me.setState({data:articles});
            //Init material ripples and jQuery effects after render
            $.material.init();
        });
    },
    render: function() {
        return (
            <div className="articleBox container">
                <div className="navbar navbar-warning">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-warning-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="javascript:void(0)">React News</a>
                    </div>
                    <div className="navbar-collapse collapse navbar-warning-collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="javascript:void(0)">Active</a></li>
                            <li><a href="#">Link</a></li>
                        </ul>
                    </div>
                </div>
                <ArticleList data={this.state.data} />
            </div>
        );
    }
});

document.addEventListener("DOMContentLoaded", function(event) {
    React.render(
        <ArticleBox />,
        document.getElementById('content')
    );
})