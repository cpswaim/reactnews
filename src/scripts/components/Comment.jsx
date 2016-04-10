import React from 'react';

export default class Comment extends React.Component {
    render() {
        var children = null;
        if(this.props.kids){
            children = this.props.kids.map(function(comment, index) {
                //console.log(index);
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
            });
        }
        return (
            <div className="row comment">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-body"><a href={"https://news.ycombinator.com/user?id="+this.props.by}>{this.props.by}</a>&nbsp;
                            {new Date(this.props.time*1000).toISOString()}
                            <br />
                            <p dangerouslySetInnerHTML={{__html: this.props.text}}></p>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
                    // commentId={comment.id}
                    // text={comment.text}
                    // by={comment.by}
                    // time={comment.time}
                    // kids={comment.kids}
                    // key={index}
                    // number={index+1} 