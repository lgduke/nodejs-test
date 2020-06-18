var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title,list,body,control){
  return `<!doctype html>
  <html>
  <head>
    <title>WEB!!! - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB22</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>`;
}
function templateList(filelist){
  var list = '<ul>';
  var  i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
//    console.log("_url is ", _url)
//    console.log("queryData is ", queryData)
//    console.log("pathname is ", pathname)
    if(pathname === '/'){
      if(queryData.id === undefined ){

        var testFolder = './data/';

        fs.readdir(testFolder, function(error, filelist){
          console.log(filelist);
          var title = "Welcome";
          var desc = "Hello. Node.Js";

          var list = templateList(filelist);

          var body = `<h2>${title}</h2>${desc}`;
          var control =`<a href="/create">create</a>`;
          var template = templateHTML(title,list,body,control);
            response.writeHead(200);
            response.end(template);

        })
      }
      else {
        var testFolder = './data/';

        fs.readdir(testFolder, function(error, filelist){
          console.log(filelist);
//          var title = "Welcome";
          var desc = "Hello. Node.Js";

        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, desc) {
//            console.log(desc);
//            console.log(err);
            var list = templateList(filelist);
            var body = `<h2>${title}</h2>${desc}`;
            var control =`<a href="/create">create</a>
                <a href="/update?id=${title}">update</a>`;
            var template = templateHTML(title,list,body,control);
            response.writeHead(200);
            response.end(template);
            //      response.end(queryData.id);
            //      response.end('Duke : ' + url);
            //        console.log(queryData.id);
          });
        });
      }
    } else if(pathname === '/create') {
      var testFolder = './data/';

      fs.readdir(testFolder, function(error, filelist){
//        console.log(filelist);
        var title = "WEB-create";
        var desc = "TEstTEst";
        var list = templateList(filelist);

        console.log("queryData is ", queryData)
        console.log("pathname is ", pathname)

        var body = `<form action="/create_process", method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="desc" rows="8" cols="80" placeholder="description" ></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`;
        var template = templateHTML(title,list,body,'');
          response.writeHead(200);
          response.end(template);
    });
  } else if(pathname === '/create_process'){
    var body ='';
    request.on('data', function(data){
      body = body + data
    });
    request.on('end',function() {
      var post = qs.parse(body);
      var title = post.title;
      var desc = post.desc;
      fs.writeFile(`data/${title}`, desc, 'utf8', function(err){
        response.writeHead(302, {Location:`/?id=${title}` });
        response.end();
      });
      console.log(post.title);
      console.log(post.desc);
    });

  } else if(pathname === '/update') {
        var testFolder = './data/';
        console.log(pathname);
        fs.readdir(testFolder, function(error, filelist){
          console.log(filelist);
    //          var title = "Welcome";
          var desc = "Hello. Node.Js";

        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, desc) {
    //            console.log(desc);
    //            console.log(err);
            var list = templateList(filelist);
            var body = `<form action="/update_process", method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="desc" rows="8" cols="80" placeholder="description">${desc}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>`;
            var control =`<a href="/create">create</a>
                <a href="/update?id=${title}">update</a>`;
            var template = templateHTML(title,list,body,control);
            response.writeHead(200);
            response.end(template);
            //      response.end(queryData.id);
            //      response.end('Duke : ' + url);
            //        console.log(queryData.id);
          });
        });
  } else if(pathname === '/update_process'){
    var body ='';
    request.on('data', function(data){
      body = body + data
    });
    request.on('end',function() {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var desc = post.desc;
      fs.rename(`data/${id}`,`data/${title}`,function(error){
        fs.writeFile(`data/${title}`, desc, 'utf8', function(err){
          response.writeHead(302, {Location:`/?id=${title}` });
          response.end();
        });
      });
      console.log(post);
      /*

      */
//      console.log(post.title);
//      console.log(post.desc);
    });

  } else {
      response.writeHead(404);
      response.end(`${pathname} -- Not Found`);
    }

});
app.listen(3000);
