var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');

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
/*
          var list = templateList(filelist);
          var body = `<h2>${title}</h2>${desc}`;
          var control =`<a href="/create">create</a>`;
          var template = templateHTML(title,list,body,control);
*/
          var list = template.List(filelist);
          var body = `<h2>${title}</h2>${desc}`;
          var control =`<a href="/create">create</a>`;
          var HTML = template.HTML(title,list,body,control);

          response.writeHead(200);
          response.end(HTML);

        })
      }
      else {
        var testFolder = './data/';

        fs.readdir(testFolder, function(error, filelist){
          console.log(filelist);
          var filteredId = path.parse(queryData.id).base;

//          var title = "Welcome";
          var desc = "Hello. Node.Js";

        fs.readFile(`data/${filteredId}`, 'utf8', function(err, desc) {
//            console.log(desc);
//            console.log(err);
            var list = template.List(filelist);
            var body = `<h2>${title}</h2>${desc}`;
            var control =`
                <a href="/create">create</a>
                <a href="/update?id=${title}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${title}">
                  <input type="submit" value="delete ${title}">
                </form>
                `;
            var HTML = template.HTML(title,list,body,control);
            response.writeHead(200);
            response.end(HTML);
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
        var list = template.List(filelist);

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
        var HTML = template.HTML(title,list,body,'');
          response.writeHead(200);
          response.end(HTML);
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
    //      console.log(filelist);
    //          var title = "Welcome";
          var desc = "Hello. Node.Js";

          var filteredId = path.parse(queryData.id).base;

        console.log(filteredId);
        console.log(title);
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, desc) {
    //            console.log(desc);
    //            console.log(err);
            var title = queryData.id;
            var list = template.List(filelist);

            console.log("1----");

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


            var HTML = template.HTML(title,list,body,control);

            console.log("2----");
            response.writeHead(200);
            response.end(HTML);
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

  } else if(pathname === '/delete_process'){
    var body ='';
    request.on('data', function(data){
      body = body + data
    });
    request.on('end',function() {
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`,function(error){
          response.writeHead(302, {Location:`/` });
          response.end();
        })
      });

  }   else {
      response.writeHead(404);
      response.end(`${pathname} -- Not Found`);
    }

});
app.listen(3000);
