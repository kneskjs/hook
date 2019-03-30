# Knesk Hook &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/knesk/hook/blob/master/LICENSE)


#### A Wordpress like hook and filter module in Javascript.
Can be used as Javascript Plugin or Node.js Module with any kind of Node.js Framework

### How to Install
  ```javascript
npm install @knesk/hook
or
yarn add @knesk/hook
```

#### All Examples
Check example.js file for all examples and simply run by using command **node example.js**

#### Action Example
```javascript
const Hook = require('./index.js')();
async function actionDemo1() {
    console.log('\n======= Action DEMO1 =========');
    Hook.Action.add('action/demo1', function(person) {
        console.log(`My name is ${person.fname} ${person.lname}`)
    }, {priority: 11});
    Hook.Action.add('action/demo1', function() {
        console.log('Again one more action');
    }, {priority: 12});
    
    // Demo 2
    Hook.Action.add('action/demo2', function(fname, lname) {
        console.log(`My name is ${fname} ${lname}`);
    });
    
    await Hook.Action.do('action/demo1', {fname: 'Aman', lname: 'Khanakia'});
    await Hook.Action.do('action/demo2', 'Aman', 'Khanakia');
    /*
    outputs -
       My name is Aman Khanakia
       Again one more action
       My name is Aman Khanakia
    */
}
```

#### Filter Examples
```javascript
const Hook = require('./index.js')();
async function filterDemo1() {
    console.log('\n======= FILTER DEMO1 =========');
    Hook.Filter.add('filter/demo1', function(person) {
        console.log(person) // { fname: 'Aman', lname: 'Khanakia' }
        person.fname = 'Kevin';
        return person
    });
    
    console.log(await Hook.Filter.apply('filter/demo1', {fname: 'Aman', lname: 'Khanakia'}))
    // output - { fname: 'Kevin', lname: 'Khanakia' }
}

async function filterDemo3() {
    console.log('\n======= FILTER DEMO3 =========');
    Hook.Filter.add('filter/demo3', function(fname, lname) {
        fname = 'Kevin'
        return [...arguments]
    });
    
    Hook.Filter.add('filter/demo3', function(fname, lname) {
        fname = 'Ryan'
        lname = 'Sassy'
        return [...arguments]
    });
    const result = (await Hook.Filter.apply('filter/demo3', 'Aman', 'Khanakia'))
    console.log(result)
    // output - [ 'Ryan', 'Sassy' ]
    console.log(`result[0] - ${result[0]}`)
    // output - Ryan
}
```