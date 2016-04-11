import React from 'react';

export default class Banner extends React.Component {
    onRefreshClick(event){
        AppDispatcher.dispatch({
            eventName: 'reload'
        })
    }
    onTitleClick(event){
        AppDispatcher.dispatch({
            eventName: 'home'
        })
    }
    render() {
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
}