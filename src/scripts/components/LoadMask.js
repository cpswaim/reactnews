var LoadMask = React.createClass({
    render: function() {
        return (
            <div className="loadmask modal">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content text-center">
                        <div className="modal-header">
                            <h4 className="modal-title">Loading Latest News...</h4>
                        </div>
                        <div className="modal-body">
                            <img src="assets/loading.gif" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});