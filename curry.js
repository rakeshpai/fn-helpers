// From http://tech.pro/tutorial/2011/functional-javascript-part-4-function-currying

function sub_curry(fn /*, variable number of args */) {
	var args = [].slice.call(arguments, 1);
	return function () {
		return fn.apply(this, args.concat([].slice.apply(arguments)));
	};
}

var curry = module.exports = function(fn, length) {
	// capture fn's # of parameters
	length = length || fn.length;
	return function () {
		if (arguments.length < length) {
			// not all arguments have been specified. Curry once more.
			var combined = [fn].concat([].slice.apply(arguments));
			return length - arguments.length > 0 
				? curry(sub_curry.apply(this, combined), length - arguments.length)
				: sub_curry.call(this, combined );
		} else {
			// all arguments have been specified, actually call function
			return fn.apply(this, arguments);
		}
	};
}

