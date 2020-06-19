var members=['duke','songjun','yoonsuk'];
console.log(members[1]);

var i =0;
while(i < members.length) {
  console.log('array loop', members[i]);
  i = i + 1;
}

var roles = {'manager':'duke',
             'platform':'songjun',
             'platform2':'yoonsuk'}

console.log(roles.manager);
console.log(roles['manager']);

for(var name in roles){
  console.log('object',name, 'value =>', roles[name]);
}
