//  underscore_plus.js
//  (c) 2012 Gary McGhee, Buzzware Solutions
//  https://github.com/buzzware/underscore_plus
//  Underscore may be freely distributed under the MIT license.

(function() {

_.stringify = function(aObject) {
	if (_.isString(aObject))
		return aObject;
	if (aObject===null || aObject===undefined)
		return '';
	if (aObject.toString)
		return aObject.toString();
	return '';
};

_.nameValueString = function(aObject) {
	return _.map(_.keys(aObject),function(k) { return k+'="'+_.stringify(aObject[k])+'"'}).join(' ');
};

_.classEnsure = function(aOrig,aNew) {
	if (!aOrig)
		return aNew;
	if (!aNew)
		return aOrig;
	return _.union(aOrig.split(' '),aNew.split(' '));
};

_.getPath =	function(aObject,aPath,aDefault) {
	if ((typeof aObject)=='string') {   // allow aObject to be left out and assume this
		if (arguments.length==1) {
			aPath = aObject;
			aObject = window;
		} else if (arguments.length==2) {
			aDefault = aPath;
			aPath = aObject;
			aObject = window;
		}
	}
	var nodes = aPath.split('.');
	var curr = aObject;
	for (var i=0;i<nodes.length;i++) {
		var name = nodes[i];
		if ((curr===undefined)||(curr===null))
			return aDefault;
		if (curr.hasOwnProperty(name) || curr[name]) {
			var val = curr[name];
			if ((typeof val)=='function')
				curr = val.call(curr);
			else
				curr = val;
		} else {
			return aDefault;		// name doesn't exist
		}
	}
	return curr;
}

_.moveKeys = function(aDest,aSource,aKeys) {
	if (!aSource)
		return aDest;
	if (!aKeys)
		aKeys = _.keys(aSource);
	for (var i=0;i<aKeys.length;i++) {
		var k = aKeys[i];
		if (!aSource.hasOwnProperty(k))
			continue;
		aDest[k] = aSource[k];
		delete aSource[k];
	}
	return aDest;
};

_.removeKey = function(aObject,aKey) {
	var result = aObject[aKey];
	delete aObject[aKey];
	return result;
};

}).call(this);
