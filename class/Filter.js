const _ = require('lodash');
const util = require('@kneskjs/util');
const Util = new util();

module.exports = class Filter {
	constructor() {
		this.actions=[]
	}

    /*
        Input Arguments -> Should Output Array
        Input Objet -> Should Output Object
    */
    async apply(tag) {
        let argArray = [].slice.call(arguments, 1)
        
        // let result = null
        let actions = _.filter(this.actions, function(o) { return o.tag==tag; });
        actions = _.sortBy(actions, ['priority']);

        await Util.asyncForEach(actions, async (item) => {
            if(!Array.isArray(argArray)) argArray = [argArray]
            
            let result =  await item.function_to_add(...argArray)
            
            if(result) argArray = result
        })
        
        return argArray
        // if(!result) return argArray
        // return result
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