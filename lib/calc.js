"use strict";

var calc = module.exports = function(expression){
    if(!checkBracket(expression)){
        throw new Error('expression is unbalance quote');
    }
    var r = parse(removeMeaninglessBracket(expression.replace(/\s+/g, '')))
    return calculate(r)
}

var createNode = function(expression){
    return {
        l : null,
        r : null,
        e : expression,
    }
}

var calculate = function(node){
    if(node.l && node.r){
        var l_op = calculate(node.l);
        var r_op = calculate(node.r);
        switch(node.e){
            case "+": return l_op + r_op;
            case "-": return l_op - r_op;
            case "*": return l_op * r_op;
            case "/": return l_op / r_op;
            default:  return 0.0;
        }
    }else{
        return parseFloat(node.e);
    }
}

var parse = function(expression){
    var pos = getOperatorPostion(expression);
    if (pos < 0) {
        return createNode(expression)
    }
    var node = createNode(expression.substr(pos, 1));
    node.l = parse(removeBracket(expression.substr(0, pos)));
    node.r = parse(removeBracket(expression.substr(pos + 1)));
    return node;
}

var checkBracket = function(str){
    var quote = 1;
    var len = str.length;
    for (var i = 0; i < len; ++i) {
        if (str[i] == '('){
            quote++;
        }
        else if (str[i] == ')'){
            quote--;
        }
    }
    if (quote != 1){
        return false;
    }
    return true;
}

var removeBracket = function(str){
    var len = str.length;
    if(!(str[0] === '(' && str[len - 1] === ')')){
        return str;
    }else{
        return removeBracket(str.substr(1, len - 2));
    }
}

var getOperatorPostion = function(expression){
    var prioMin = 0;
    var prioMax = 3;
    var pos = -1;
    var quote = 0;
    var prio = prioMin;
    var lowPrio = prioMax + 1;

    for(var i = 0; i < expression.length; i++){
        switch (expression[i]) {
            case '=': prio = 1; break;
            case '+': prio = 2; break;
            case '-': prio = 2; break;
            case '*': prio = 3; break;
            case '/': prio = 3; break;
            case '(': quote++; continue;
            case ')': quote--; continue;
            default: continue;
        }
        if(quote == 0 && prio <= lowPrio){
            lowPrio = prio;
            pos = i;
        }
    }
    return pos;
}

var removeMeaninglessBracket = function(expression){
    var n = expression.match(/\(\d+\)/);
    if(n){
        return removeMeaninglessBracket(expression.replace(n[0], n[0].replace('(', '').replace(')', '')))
    }else{
        if (expression[0] === '(' && expression[expression.length - 1] === ')'){
            return removeMeaninglessBracket(expression.substr(1, expression.length - 2));
        }else{
            return expression;
        }
    }
}

