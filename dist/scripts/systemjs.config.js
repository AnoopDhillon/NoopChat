/**
 * System configuration for Angular 2.
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        // angular
        '@angular/core': 'scripts/lib/@angular/core/bundles/core.umd.js',
        '@angular/common': 'scripts/lib/@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'scripts/lib/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'scripts/lib/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'scripts/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'scripts/lib/@angular/http/bundles/http.umd.js',
        '@angular/router': 'scripts/lib/@angular/router/bundles/router.umd.js',
        '@angular/forms': 'scripts/lib/@angular/forms/bundles/forms.umd.js',

        // other libraries
        'rxjs': 'scripts/lib/rxjs',
        'angular2-in-memory-web-api': 'scripts/lib/angular2-in-memory-web-api',
        'sortablejs': 'scripts/lib/Sortable.js',
        'ng2-translate': 'scripts/lib/ng2-translate',
        'socket.io-client': 'scripts/lib/socket.io-client'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'bootstrap.js',  defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'ng2-translate': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
        'socket.io-client': { main: '/lib/index.js', defaultExtension: 'js' }
    };

    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
