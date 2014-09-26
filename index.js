var curry = require("./curry");

var _ = {
	isTrue: function(x) { return !!x },
	equals: curry(function(prop, value, obj) { return obj[prop] == value; }),
	notEquals: curry(function(prop, value, obj) { return obj[prop] != value; }),
	trim: function(x) { return x.trim(); },
	first: curry(function(x, fn) { return x.filter(fn)[0]; }),
	using: function(fn, dir) { return function(a, b) { return (dir=="desc")?(fn(a) < fn(b)):(fn(b) < fn(a)); } },
	until: function(n) { var a = []; for(var i=0; i<n; i++) { a.push(i); } return a; },
	log: function(x) { console.log(x); return x; },
	keys: function(x) { return Object.keys(x); },
	propFrom: curry(function(o,p) { return o[p]; }),
	flatten: function(arr) { return [].concat.apply([], arr); },
	intersection: function(x,y) { return x.filter(function(i) { return _.contains(y, i); }); },

	unique: function(x,i,a) { return a.indexOf(x) == i; },
	isArray: function(x) { return Object.prototype.toString.call(x) == "[object Array]"; },
	contains: function(arr, val) { return arr.indexOf(val) != -1},
	isPartOf: curry(function(val, arr) { return _.contains(arr, val); }),
	isSubstringOf: curry(function(str, val) { return _.contains(str, val); }),
	replace: curry(function(regex, replaced, str) { return str.replace(regex, replaced); }),
	match: curry(function(regex, str) { return str.match(regex); }),
	
	max: function(x,y) { return x<y?y:x; },
	min: function(x,y) { return x<y?x:y; },

	pick: curry(function(prop, obj) {
		if(typeof prop == "string") return obj[prop];
		return prop.reduce(function(o, p) { o[p] = obj[p]; return o; }, {})
	}),

	clone: function(x) { return JSON.parse(JSON.stringify(x)); },
	curry: curry
}

_.exists = _.isTrue;
_.unquote = _.replace(/^(["'])(.*)?\1/g, "$2");
_.dot = _.pick;


module.exports = _;
