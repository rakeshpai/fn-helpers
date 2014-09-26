# fn-helpers

A library of really small JS functions that I found myself using frequently all over the place.

```
npm install fn-helpers
```

Uses the magic of currying to make code look very expressive and terse. Doesn't modify native objects. Total code size is under 100 LoC with zero external deps, so it's perfect for client-side use as well. Heavy focus on readability and composition.

## Usage

```javascript
var _ = require("fn-helpers");

var people = [
	{name: "Alice", age: 27, manager: true},
	{name: "Bob", age: 22},
];

var aged27 = people.filter(_.equals("age", 27)),
	namedBob = people.filter(_.equals("name", "Bob")),
	notBob = people.filter(_.notEquals("name", "Bob")),

	names = people.map(_.pick("name")),	// or _.dot("name")
	ages = people.map(_.pick("age")),
	withoutAge = people.map(_.pick(["name", "manager"])),
	fixedNames = names.map(_.replace("Bob", "Robert")),	// Full regex support too!

	trimmedNames = names.map(_.trim),

	managers = people.filter(_.isTrue("manager")),	// or _.exists("manager")
	mamager = _.first(people, _.isTrue("manager")),
	managerNames = people.filter(_.exists("manager")).map(_.dot("name")), // ["Alice"]

	sortedByAge = people.sort(_.using(_.dot("age"), "asc")),	// sorted in ascending order by .age
	sortedByName = people.sort(_using(_.dot("name"), "desc")),	// sorted in descending order by .name

	// More curry magic!
	aged = _.equals("age"),
	aged27 = people.filter(aged(27)),

	notNamed = _.notEquals("name"),
	notBob = people.filter(notNamed("Bob"));

var obj = {
	alice: 27,
	bob: 22
};

var keys = _.keys(obj),	// ["alice", "bob"]
	obj2 = _.clone(obj);

var a = [1,2,3,4],
	b = [3,4,5,6];

_.intersection(a,b); // [3,4]
_.contains(a, 1);	// true
_.isArray(a);	// true
_.flatten([a, b]); // [1,2,3,4,3,4,5,6];
_.flatten([a, b]).filter(_.unique);		// [1,2,3,4,5,6]

_.until(5);		// [0,1,2,3,4]

```

## Philosophy

You know how a `.forEach` loop is better than a `for` loop? That's because you don't deal with the _mechanics_ of the loop in a `.forEach`. There's no counter, no incrementing, no exit condition, no array-index based accessor, none of that fluff.

However, within the `.forEach` (or `.map` or `.filter`), you still have to receive each item, and operate on some property of that item. This means that you will need to accept the item as an argument, access a property of this item, operate on it to do what you want, and return what's appropriate. That's still a lot of mechanics to deal with - this time of the _data_. Also, if you are like me, seeing code littered with the verbose `function(item) { return ... }` drives me up the wall.

This lib helps deal with reducing some of the `function(item) { return ... }` clutter, while also letting you express your code in terms of _transformations_ on the data, rather than the _mechanics_ of how to operate on the data. This way, when you write `people.filter(_.equals("name", "Bob"))`, you haven't had to declare a filter function (it was generated for you using currying), and you didn't have to accept a `item` or `person` argument, access the person's `name`, check against a condition (`== "Bob"`), and return a boolean. All of that stuff is simply absent, leaving you with just the very crux of your logic.

When you see the light, regular array operations seem so verbose! They also seem to break the train of thought, since you have to keep switching between thinking in terms of lists and individual items. Ugh!

Composition is fun when you use really small pieces to create beautiful things, expressed very succinctly.

## License

MIT