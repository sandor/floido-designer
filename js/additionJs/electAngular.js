/*
> electangular.js
> AngularJS Module for Atom Electron
> (c)2016 develephant @develephant
> license MIT
> version 0.0.2
*/
'use strict';

var electangular = angular.module('electangular', [])

electangular.run(['$rootScope', 'electron', function ($rootScope, ele) {
  ele.ipcRenderer.on('electron-msg', (event, arg) => {
    $rootScope.$emit('electron-msg', arg);
  });
}])

electangular.value("electron_core", require('electron'))