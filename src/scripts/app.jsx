import React from 'react';
import ReactDOM from 'react-dom';
import Flux from 'flux';
import ReactNews from './ReactNews';
import $ from 'jquery';
import 'bootstrap-material-design/dist/js/material.min.js';
import 'bootstrap-material-design/dist/js/ripples.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'css/main.css';

document.addEventListener("DOMContentLoaded", function(event) {
    window.AppDispatcher = new Flux.Dispatcher();

    ReactDOM.render(
        <ReactNews />,
        document.getElementById('app')
    );
})