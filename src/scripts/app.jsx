import React from 'react';
import ReactDOM from 'react-dom';
import Flux from 'flux';
import ReactNews from './ReactNews';
import $ from 'jquery';
import '../../bower_components/bootstrap-material-design'

import '../../bower_components/bootstrap/dist/css/bootstrap.min.css';
import '../../bower_components/bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import '../../bower_components/bootstrap-material-design/dist/css/ripples.min.css';
import '../../bower_components/font-awesome/css/font-awesome.min.css';
import '../../src/css/main.css';

document.addEventListener("DOMContentLoaded", function(event) {
    window.AppDispatcher = new Flux.Dispatcher();

    ReactDOM.render(
        <ReactNews />,
        document.getElementById('app')
    );
})