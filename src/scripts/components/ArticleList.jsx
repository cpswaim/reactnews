import React from 'react';
import Article from './Article';

export default class ArticleList extends React.Component {
    render() {
        var articleNodes = this.props.data.map(function(article, index) {
            //console.log(index);
            return (
                <Article
                    articleId={article.id}
                    url={article.url}
                    title={article.title}
                    by={article.by}
                    score={article.score}
                    descendants={article.descendants}
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
}