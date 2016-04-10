import React from 'react';
import Comment from './Comment'

export default class CommentList extends React.Component {
    onBackClick(event){
        AppDispatcher.dispatch({
            eventName: 'home'
        })
    }
    render() {
        var viewNodes = [];

        if(this.props.article.kids){
            viewNodes = viewNodes.concat(this.props.article.kids.map(function(comment, index) {
                return (
                    <Comment
                        commentId={comment.id}
                        text={comment.text}
                        by={comment.by}
                        time={comment.time}
                        kids={comment.kids}
                        key={index}
                        number={index+1} />
                );
            }));
        }
        return (
            <div className="commentList">
                <div className="row comment-header">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading" >
                                <a href={this.props.article.url}>
                                    {this.props.article.title}
                                </a>
                                <span className="action-list">
                                    <a href="#" className="fa fa-chevron-circle-left fa-lg"
                                        onClick={this.onBackClick}>
                                        <div className="ripple-container"></div>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {viewNodes}
            </div>
        );
    }
}

// {
//     "by": "HillaryBriss",
//     "id": 11054593,
//     "kids": [
//         {
//             "by": "the_watcher",
//             "id": 11054898,
//             "kids": [...],
//             "parent": 11054593,
//             "text": "&gt; Is there a rent seeking problem in the medical and dental fields too?<p>It certainly is. It&#x27;s just that the crux of this article is that occupational licensing for low or medium skilled trades is inherently problematic rent-seeking, whereas the requirement for a license to practice medicine or dentistry isn&#x27;t itself a problem, it&#x27;s the artificial limiting of those who can get the license that presents a problem.",
//             "time": 1454879946,
//             "type": "comment"
//         },
//         ...
//     ],
//     "parent": 11054527,
//     "text": "Here&#x27;s a quotation from the article:<p>&quot;Defenders of occupational licensing typically argue that the rules help protect consumers and workers, and that’s undoubtedly true in some cases. I want the people filling my cavities to know what they’re doing. But it’s hard not to suspect that in many cases, these rules serve another purpose: to make it harder for new competitors to enter the marketplace.&quot;<p>While the article seems to criticize rent-seeking behavior only in businesses and professions that require lower levels of education, if \nwe combine this article&#x27;s statements with the often repeated claim that the US pays roughly twice as much for health care per capita as other developed countries it seems reasonable to ask: Is there a rent seeking problem in the medical and dental fields too?<p>OTOH, why does the article&#x27;s author want to deny the poor and less well educated segment of the small business community its fair share of the economic protection which occupational licensing offers?",
//     "time": 1454876156,
//     "type": "comment"
// }