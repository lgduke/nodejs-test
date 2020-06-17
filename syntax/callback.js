
function a(){
  console.log('A');
}

var aa = function(){
  console.log('AA');
}

function slowfunc(callback){
  console.log('BB');
  callback();
}

a();
aa();

slowfunc(a);
