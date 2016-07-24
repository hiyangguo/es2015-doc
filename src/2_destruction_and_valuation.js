#!/usr/bin/env node
/**
 * Created by yangguo on 2016/7/13 0013.
 */
// process.env.DEBUG = true;
var common = require('../lib/common');
var print = common.print;
/**
 * 输出类型
 */
var pt = common.printType;

{
    print('变量的解构赋值', pt.h1);
    print('数组的解构赋值', pt.h2);
    print('基本用法', pt.h3);

    print(`本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。`, pt.p);
    print(`let [a,b,c] =[1, 2, 3];
console.log(a, b, c);

let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo, bar, baz);

let [head, ...tail] = [1, 2, 3, 4];
console.log("head", head);
console.log("tail", tail);

let [x, y, ...z] = ['a'];
console.log("x:", x);
console.log("y:", y);
console.log("z:", z);`);

    print('如果解构不成功，变量的值就等于undefined。', pt.p);
    print(`var [foo] = [];
console.log(foo);
var [bar, foo] = [1];
console.log(bar, foo);`);
    print('以上两种情况都属于解构不成功，foo的值都会等于undefined。', pt.p);

    print('另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。', pt.p);

    print(`let [x, y] = [1, 2, 3];
    console.log(x, y);

    let [a, [b], d] = [1, [2, 3], 4];
    console.log(a, b, d);
`);
    print('如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。', pt.p);
    print(`{
    let [foo] = 1;
    console.log(foo);
}`);
    print(`{
        let [foo] = false;
        console.log(foo);
    }`);

    print(`{
        let [foo] = NaN;
        console.log(foo);
    }`);

    print(`{
        let [foo] = undefined;
        console.log(foo);
    }`);

    print(`{
        let [foo] = null;
        console.log(foo);
    }`);

    print(`{
        let [foo] = {};
        console.log(foo);
    }`);

    print('对于Set结构，也可以使用数组的解构赋值。', pt.p);

    print('默认值', pt.h2);
    print('解构赋值允许指定默认值。', pt.p);
    print(`var [foo = true] = [];
console.log(foo);
[x, y = 'b'] = ['a']; // x='a', y='b'
console.log(x, y);
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
console.log(x, y);`);
    print(`注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。`, pt.p);

    print(`如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。`, pt.p);
    print(`function f() {
    console.log('aaa');
}
let [x = f()] = [1];`);
    print(`上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。`, pt.p);
    print(`let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}`);

    print(`默认值可以引用解构赋值的其他变量，但该变量必须已经声明。`, pt.p);
    print(`let [x = 1, y = x] = [];
console.log(x,y);`);

    print(`let [x = 1, y = x] = [2];    // x=2; y=2
console.log(x, y);`);

    print(`let [x = 1, y = x] = [1, 2]; // x=1; y=2
console.log(x, y);`);

    print(`let [x = y, y = 1] = [];  // ReferenceError
console.log(x, y);`);
    print(`上面最后一个表达式之所以会报错，是因为x用到默认值y时，y还没有声明。`, pt.p);
}

{
    print(`对象的解构`, pt.h2);
    print(`解构不仅可以用于数组，还可以用于对象。`, pt.p);

    print(`var { foo, bar } = { foo: "aaa", bar: "bbb" };
console.log(foo);
console.log(bar);`);

    print(`对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。`, pt.p);

    print(`var {bar, foo} = {foo: "aaa", bar: "bbb"};
console.log(bar, foo);//bbb aaa

var {baz} = {foo: "aaa", bar: "bbb"};
console.log(baz);//undefined`);

    print(`上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于undefined。`);

    print(`如果变量名与属性名不一致，必须写成下面这样。`);

    print(`var {foo: baz} = {foo: 'aaa', bar: 'bbb'};
console.log(baz); // "aaa"

let obj = {first: 'hello', last: 'world'};
let {first: f, last: l} = obj;
console.log(f); // 'hello'
console.log(l); // 'world'`);


}

{
    print('字符串的解构赋值', pt.h2);

    print('字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。', pt.p);

    print(`const [a, b, c, d, e] = 'hello';
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);`);

    print(`类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。`, pt.p);

    print(`let {length : len} = 'hello';
console.log(len);//5`);
}

{
    print('数组和布尔值解构', pt.h2);

    print('解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。', pt.p);

    print(`
var {toString: s} = 123;
console.log(s === Number.prototype.toString); // true

var {toString: s} = true;
console.log(s === Boolean.prototype.toString); // true`);

    print(`解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。`, pt.p);

    print(`let { prop: x } = undefined; // TypeError`);
    print(`let { prop: y } = null; // TypeError`);
}

{
    print('函数参数的解构', pt.h2);

    print(`
function add([x, y]){
    return x + y;
}

console.log(add([1, 2])); // 3 `);

    print(`上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。`, pt.p);

    print(`其他的例子`);

    print(`console.log([[1, 2], [3, 4]].map(([a, b]) => a + b));// [ 3, 7 ]`);

    print(`函数参数的解构也可以使用默认值。`);

    print(`
function move({x = 0, y = 0} = {}) {
    return [x, y];
}

console.log(move({x: 3, y: 8})); // [3, 8]
console.log(move({x: 3})); // [3, 0]
console.log(move({})); // [0, 0]
console.log(move()); // [0, 0]`);

    print(`上面代码中，函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值。

注意，下面的写法会得到不一样的结果。`, pt.p);

    print(`function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}

console.log(move({x: 3, y: 8})); // [3, 8]
console.log(move({x: 3})); // [3, undefined]
console.log(move({})); // [undefined, undefined]
console.log(move()); // [0, 0]`);

    print(`上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。`);

    print(`undefined就会触发函数参数的默认值。`);

    print(` console.log([1, undefined, 3, null, false].map((x = 'yes') => x));// [ 1, 'yes', 3 ]`);
}