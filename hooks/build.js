var fs = require('fs');
var browserify = require('browserify');

browserify('www/js/main.js')
    //.transform('uglifyify', { global: true })
    .bundle()
    .pipe(fs.createWriteStream('www/js/app.js'))