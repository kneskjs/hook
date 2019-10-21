const Filter = require('./class/Filter');
const Action = require('./class/Action');

class Hook {
	constructor() {
        this.Filter = new Filter()
        this.Action = new Action()
    }
    
    async init() {
        // console.log('Hook Init')
    }
}

module.exports = Hook