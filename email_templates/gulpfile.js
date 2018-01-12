var gulp = require('gulp');
var mjml = require('gulp-mjml');
var handlebars = require('handlebars');
var fs = require('fs');
var styleJSON = JSON.parse(fs.readFileSync('./JsonStyle/dhs-style.json'));

console.log(styleJSON);

gulp.task('default', defaultTask);

gulp.task('hbsDataTest', hbsDataTest);

gulp.task('javaMjmlWatch', function() {
  gulp.watch('./mjml-output/mjml/*.mjml')
  .on('change', function() {
    gulp.src('./mjml-output/mjml/*.mjml')
    .pipe(mjml())
    .pipe(gulp.dest('./mjml-output/mjml/html-output'));
  })
});

gulp.task('jsMjmlWatch', function() {
  gulp.watch('./handlebarsjs/mjmlTemplates/*.mjml')
    .on('change', function() {
      gulp.src('./handlebarsjs/mjmlTemplates/*.mjml')
        .pipe(mjml())
        .pipe(gulp.dest('./handlebarsjs/mjmlTemplates/html-output'));
    })
});

gulp.task('runMjml', function() {
  gulp.watch('./JsonStyle/*.mjml')
    .on('change', function() {
      gulp.src('./JsonStyle/*.mjml')
        .pipe(mjml())
        .pipe(gulp.dest('./JsonStyle/html-output'))
    });
  gulp.watch('./JsonStyle/html-output/*.html')
    .on('change', function(path) {
      reimportJsonStyle();
      var filename = path.split('/').pop();
      if(filename.indexOf('.json') < 0){
        styleHTML(path, filename.replace('.html', ''));
      }

    })
    .on('add', function(path) {
      reimportJsonStyle();
      var filename = path.split('/').pop();
      if(filename.indexOf('.json') < 0){
        styleHTML(path, filename.replace('.html', ''));
      }

    });

  gulp.watch('./JsonStyle/*.json')
    .on('change', function(path) {
      gulp.src('./JsonStyle/*.mjml')
        .pipe(mjml())
        .pipe(gulp.dest('./JsonStyle/html-output'))
      var filename = path.split('/').pop();
      if(filename.indexOf('.json') < 0){
        styleHTML(path, filename.replace('.html', ''));
      }

    })
    .on('add', function(path) {
      gulp.src('./JsonStyle/*.mjml')
        .pipe(mjml())
        .pipe(gulp.dest('./JsonStyle/html-output'))
      var filename = path.split('/').pop();
      if(filename.indexOf('.json') < 0){
        styleHTML(path, filename.replace('.html', ''));
      }

    });
})

function styleHTML(filesrc, filename) {
  filesrc.replace('.html', '.hbs');
  fs.readFile(filesrc, 'utf-8', function(err, fileContent){
    var htmlTemplate = handlebars.compile(fileContent);
    var styledHtml = htmlTemplate(styleJSON);
    fs.writeFile('./JsonStyle/html-output/styledHtml/'+filename+'.html', styledHtml, function(error) {})
  })
}


gulp.task('mjmlJsDataBind', function() {
  console.log('begin json styling mjmlJsDataBind...');
  gulp.watch('./JsonStyle/welcome-mail.mjml')
    .on('change', function(path) {
      console.log(path);
      var sourceTmpl = path;
      mjmlJSONDataBind(sourceTmpl)
    });

  gulp.watch('./JsonStyle/*.json')
    .on('change', reimportJsonStyle)
    .on('add', reimportJsonStyle);

  // gulp.watch('./JsonStyle/*.hbs')
  // .on('change', function() {
  //   gulp.src('./JsonStyle/*.hbs')
  //   .pipe(mjml())
  //   .pipe(gulp.dest('./JsonStyle/html-output'));
  //   console.log('hbs template changed, output new html template...');
  // })
  // .on('add', function() {
  //   gulp.src('./JsonStyle/*.hbs')
  //   .pipe(mjml())
  //   .pipe(gulp.dest('./JsonStyle/html-output'));
  //   console.log('hbs template changed, output new html template...');
  // });
});

function reimportJsonStyle() {
  console.log('reimport Json Style');
  styleJSON = JSON.parse(fs.readFileSync('./JsonStyle/dhs-style.json'));
}

function mjmlJSONDataBind(srcTmplPath) {
  console.log('sampleDataBind...srcTmplPath:');
  console.log(srcTmplPath);

  fs.readFile(srcTmplPath, 'utf-8', function(err, _data){
    // console.log(_data);
    var mjmlTemplate = handlebars.compile(_data);
    var mjmlWithStyleBind = mjmlTemplate(styleJSON);
    // console.log(mjmlWithStyleBind);
    console.log('old filename path:' + srcTmplPath + ', replaced with new filename path:' + srcTmplPath.replace('.mjml', '.hbs'));
    fs.writeFile(srcTmplPath.replace('.mjml', '.hbs'), mjmlWithStyleBind, function(error) {})
  })
}

gulp.task('sampleJsDataTest', function() {
  console.log('begin sampleTest...');
  gulp.watch('./handlebarsjs/mjmlTemplates/*.html')
    .on('change', function(path) {
      console.log(path)
      var sourceTmpl = path;
      sampleDataBind(sourceTmpl)
    })
});

gulp.watch('./handlebarsjs/mjmlTemplates/test/*.html')
  .on('change', function() {
    gulp.src('./handlebarsjs/mjmlTemplates/test/*.html')
    .pipe(mjml())
    .pipe(gulp.dest('./handlebarsjs/mjmlTemplates/test/html-output'));
  });

function sampleDataBind(srcTmplPath) {
  console.log('sampleDataBind...srcTmplPath:');
  console.log(srcTmplPath);

  var sampleData = { "name": "Alan", "hometown": "Somewhere, TX",
    "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};

  fs.readFile(srcTmplPath, 'utf-8', function(err, _data){
    console.log(_data);
    var mjmlTemplate = handlebars.compile(_data);
    var mjmlWithStyleBind = mjmlTemplate(sampleData);
    console.log(mjmlWithStyleBind);
    fs.writeFile('./handlebarsjs/mjmlTemplates/test/jsDataBindTmp.html', mjmlWithStyleBind, function(error) {})
  })
}

function hbsDataTest() {
  var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
    "{{kids.length}} kids:</p>" +
    "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
  var template = handlebars.compile(source);

  var data = { "name": "Alan", "hometown": "Somewhere, TX",
    "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
  var result = template(data);
  console.log(result);
}

function defaultTask(done) {
  done();
}