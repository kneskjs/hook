const Hook = require('./index.js')();

// //// ======== HOW TO USE ACTIONS (Priority is Optional)
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



// // Input As Argument should always return and pass as an Array
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

// Input Object should always return object
async function filterDemo4() {
    console.log('\n======= FILTER DEMO4 =========');
    Hook.Filter.add('filter/demo4', function(person) {
        person.fname = 'Kevin'
        return person
    });
    
    Hook.Filter.add('filter/demo4', function(person) {
        person.fname = 'Ryan'
        return person
    });
    
    const result = (await Hook.Filter.apply('filter/demo4', {fname: 'Aman', lname: 'Khanakia'}))
    console.log(result)
    // output - { fname: 'Ryan', lname: 'Khanakia' }
}


// Filter by Priority - Higher the priority will always execute later
async function filterDemo5() {
    console.log('\n======= FILTER DEMO5 =========');
    Hook.Filter.add('filter/demo5', function(person) {
        // person - { fname: 'Ryan', lname: 'Khanakia' }
        person.fname = 'Kevin'
        return person
    }, {priority: 12});
    
    Hook.Filter.add('filter/demo5', function(person) {
        // person - { fname: 'Aman', lname: 'Khanakia' }
        person.fname = 'Ryan'
        return person
    }, {priority: 1});
    
    const result = (await Hook.Filter.apply('filter/demo5', {fname: 'Aman', lname: 'Khanakia'}))
    console.log(result)
    // output - { fname: 'Kevin', lname: 'Khanakia' }
};

(async() => {
    await actionDemo1();
    await filterDemo1();
    await filterDemo3();
    await filterDemo4();
    await filterDemo5();
})();