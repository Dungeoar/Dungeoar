var path = require("path");
var fs   = require("fs");

module.exports = LFS;

function LFS(opts) {
	this.opts   = opts || {};
	this.layers = [];
	this.cache  = {};

	if (Array.isArray(this.opts.layers)) {
		for (var i = 0; i < this.opts.layers.length; i++) {
			this.add(this.opts.layers[i]);
		}
	}
}

LFS.prototype.add = function (fs_path) {
	try {
		var stat = fs.statSync(fs_path);
	} catch (e) {
		if (e.code == "ENOENT") {
			throw new Error(fs_path + " is not a directory");
		}
		throw e;
	}

	if (!stat.isDirectory()) {
		throw new Error(fs_path + " is not a directory");
	}

	this.layers.push(fs_path);

	return this;
};

LFS.prototype.get = function (fs_path, opts, next) {
	var i = 0, len = this.layers.length, filename;
	var ret = function (val, layer) {
		if (this.opts.cache > 0 && !this.cache.hasOwnProperty(fs_path)) {
			this.cache[fs_path] = {
				val   : val,
				layer : layer,
				exp   : Date.now() + this.opts.cache
			};
		}
		if (typeof next != "function") {
			return (opts.layer ? layer : val);
		}
		return next(opts.layer ? layer : val);
	}.bind(this);

	if (typeof opts == "function") {
		next = opts;
		opts = {};
	} else if (typeof opts == "undefined") {
		opts = {};
	}

	if (!opts.hasOwnProperty("layer")) {
		opts.layer = this.opts.layer;
	}

	if (this.opts.cache > 0 && this.cache[fs_path]) {
		if (this.cache[fs_path].exp > Date.now()) {
			return ret(this.cache[fs_path].val, this.cache[fs_path].layer);
		}
		delete this.cache[fs_path];
	}

	if (typeof next != "function") {
		// synchronous check
		for (; i < len; i++) {
			filename = path.join(this.layers[i], fs_path);

			if (fs.existsSync(filename)) {
				return ret(filename, this.layers[i]);
			}
		}

		return ret(null, null);
	}

	var check_next = function () {
		if (i >= len) {
			return ret(null, null);
		}

		var filename = path.join(this.layers[i], fs_path);

		fs.exists(filename, function (exists) {
			if (exists) {
				return ret(filename, this.layers[i]);
			}

			i += 1;
			return check_next();
		}.bind(this));
	}.bind(this);

	check_next();

	return this;
};

function extend(obj, source) {
	for (var k in source) {
		if (!obj.hasOwnProperty(k)) {
			obj[k] = source[k];
		}
	}
	return obj;
}
