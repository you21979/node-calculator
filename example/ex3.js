var calc = require('..');

var tbl = function(v){
    var obj = {
        'player.power' : 100,
        'monster.armor' : 50,
    };
    return obj[v];
}

var damage = '([player.power]-[monster.armor])+1';
var w = damage.match(/\[.+?\]/g)
w = w ? w : [];
w.forEach(function(v){
    damage = damage.replace(v, tbl(v.replace('[', '').replace(']', '')));
})

console.log([damage, '=', calc(damage)].join(''))
