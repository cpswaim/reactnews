import React from 'react';

export default class LoadMask extends React.Component {
    render() {
        return (
            <div className="loadmask modal">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content text-center">
                        <div className="modal-header">
                            <h4 className="modal-title">Loading Latest News...</h4>
                        </div>
                        <div className="modal-body"></div>
                    </div>
                </div>
            </div>
        );
    }
}