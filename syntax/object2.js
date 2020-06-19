function f1() {
  console.log("f1");
  console.log(1+1);
  console.log(1+1);
}

f1();

var f = function() {
  console.log("--");
  console.log(1+1);
  console.log(1+1);
}
console.log(f);
f();

var a = [f];
console.log("****")
a[0]();

var o = {
  func : f
}

console.log("@@@@@")
o.func();
