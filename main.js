var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

//    console.log(url.parse(_url, true));
//    console.log(url);
//    console.log("--------");
//    console.log(queryData);
//      console.log(queryData.id);
//    console.log("--------");
//    console.log(_url);
//    console.log("--------");
//    console.log(__dirname + _url);
//     console.log(queryData.id);
    if(pathname === '/'){
      if(queryData.id === undefined ){

        var testFolder = './data/';

        fs.readdir(testFolder, function(error, filelist){
          console.log(filelist);
          var title = "Welcome";
          var desc = "Hello. Node.Js";

          var list = '<ul>';
          var  i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list+'</ul>';

          var template =`
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${desc}</p>
          </body>
          </html>
          `;
            response.writeHead(200);
            response.end(template);

        })



      }
      else {
        var testFolder = './data/';

        fs.readdir(testFolder, function(error, filelist){
          console.log(filelist);
          var title = "Welcome";
          var desc = "Hello. Node.Js";

          var list = '<ul>';
          var  i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list+'</ul>';

        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, desc) {
            console.log(desc);
            console.log(err);
            var template =`
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${desc}</p>
            </body>
            </html>
            `;
              response.writeHead(200);
              response.end(template);
            //      response.end(queryData.id);
            //      response.end('Duke : ' + url);
            //        console.log(queryData.id);
          });
          });
      }
    }
    else {
      response.writeHead(404);
      response.end("Not Found");
    }

});
app.listen(3000);
