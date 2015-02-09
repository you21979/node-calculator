var calc = require('..');

[
    '1 + 1',
    '(1) + 1',
    '1 + (1)',
    '(1) + (1)',
    '((1) + (1))',
    '(1 + (1))',
    '(1 + 1)'
].map(function(v){
    return v + ' = ' + calc(v)
}).forEach(function(v){
    console.log(v);
})

