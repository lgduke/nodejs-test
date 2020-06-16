var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(_url);

    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
//    console.log(url);
//    console.log("--------");
//    console.log(queryData);
//      console.log(queryData.id);
//    console.log("--------");
//    console.log(_url);
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
//    console.log("--------");
//    console.log(__dirname + _url);
      console.log(queryData.id);
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
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${desc}</p>
        </body>
        </html>
        `;
          response.end(template);
        //      response.end(queryData.id);
        //      response.end('Duke : ' + url);
        //        console.log(queryData.id);
      })

});
app.listen(3000);
