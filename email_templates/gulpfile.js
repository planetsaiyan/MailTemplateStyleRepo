var gulp = require('gulp');
var mjml = require('gulp-mjml');
var handlebars = require('handlebars');
var fs = require('fs');

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

gulp.task('mjmlJsDataBind', function() {
  console.log('begin mjmlJsDataBind...');
  gulp.watch('./handlebarsjs/mjmlTemplates/*.mjml')
  .on('change', function(path) {
    console.log(path)
    var sourceTmpl = path;
    mjmlJSONDataBind(sourceTmpl)
  })
});

gulp.watch('./handlebarsjs/mjmlTemplates/*.mjml')
.on('change', function() {
  gulp.src('./handlebarsjs/mjmlTemplates/*.mjml')
  .pipe(mjml())
  .pipe(gulp.dest('./handlebarsjs/mjmlTemplates/html-output'));
});

function mjmlJSONDataBind(srcTmplPath) {
  console.log('sampleDataBind...srcTmplPath:');
  console.log(srcTmplPath);

  var styleJSON = {
      "items": [
        {
          "name": "Handlebars.java rocks!"
        }
      ],
      "myblue": "blue"
    };

  fs.readFile(srcTmplPath, 'utf-8', function(err, _data){
    console.log(_data);
    var mjmlTemplate = handlebars.compile(_data);
    var mjmlWithStyleBind = mjmlTemplate(styleJSON);
    console.log(mjmlWithStyleBind);
    fs.writeFile(srcTmplPath, mjmlWithStyleBind, function(error) {})
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