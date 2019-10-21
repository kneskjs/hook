var _ = require('lodash')
const util = require('@knesk/util');
const Util = new util();

module.exports = class Action {
	constructor() {
		this.actions=[]
	}
    
    do(tag) {
        let actions = _.filter(this.actions, function(o) { return o.tag==tag; });
        actions = _.sortBy(actions, ['priority']);
        return Util.asyncForEach(actions, async (item) => {
            // Convert arguments object to array
            let argArray = [].slice.call(arguments, 1)
            await item.function_to_add(...argArray)
        })
    }
    
    add(tag, function_to_add, args={} ) {
        args = Object.assign({}, {priority: 10}, args)
        const actionObject = {
            tag: tag,
            function_to_add: function_to_add,            
            priority: args.priority
        }
    
        const action = {...actionObject, ...args}
        this.actions.push(action)
    }
    
    remove(tag) {
        _.remove(this.actions, function(e) {
            return e.tag == tag;
        });
           
    }
}