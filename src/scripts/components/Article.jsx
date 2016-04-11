import React from 'react';

export default class Article extends React.Component {
    constructor(props){
        super(props);
        this.onCommentsClick = this.onCommentsClick.bind(this);
    }
    onCommentsClick(){
        AppDispatcher.dispatch({
            eventName: 'viewComments',
            content: this.props
        })
    }
    render() {
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
                            <a href="#" onClick={this.onCommentsClick}>
                                <i className="fa fa-commenting-o"></i>&nbsp;
                                ({this.props.descendants})
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}