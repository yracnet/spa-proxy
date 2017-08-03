var gutil = require('gulp-util');
var proxy = require("http-proxy-middleware");

function SpaProxy(app, mod, path) {
	context = path || mod;
	project = app + '-' + mod + '-web';
	var dir = ['part', 'view', 'ctrl', 'css', 'js'];
	var pathSpa, pathStatic, pathShowcase;

	this.withStatic = function (path, static) {
		if (path) {
			static = static || 'static-web';
			pathStatic = path + '/' + static + '/src/main/webapp';
		} else {
			pathStatic = undefined;
		}
	};

	this.withShowcase = function (path, showcase) {
		if (path) {
			showcase = showcase || 'showcase-web';
			pathShowcase = path + '/' + showcase + '/src/main/webapp';
		} else {
			pathShowcase = undefined;
		}
	};

	this.withSpa = function (path, main) {
		if (path) {
			main = main || 'spa-web';
			pathSpa = path + '/' + main + '/src/main/webapp';
		} else {
			pathSpa = undefined;
		}
	};

	this.createRoutes = function () {
		var routes = {};
		for (var i in dir) {
			var dirName = dir[i];
			var key = '/' + context + '/' + dirName + '/';
			var value = './' + project + '/src/main/webapp/' + dirName + '/';
			routes[key] = value;
		}
		if (pathStatic) {
			routes['/static'] = pathStatic;
		}
		if (pathShowcase) {
			routes['/static/showcase'] = pathShowcase;
		}
		if (pathSpa) {
			routes['/index.html'] = pathSpa + '/index.html';
			routes['/broken'] = pathSpa + '/broken';
			routes['/jsx'] = pathSpa + '/jsx';
		}
		return routes;
	};

	this.createRules = function () {
		var rules = [];
		var ix = 0;
		rules[ix++] = '!/browser-sync/**';
		for (var i in dir) {
			var dirName = dir[i];
			rules[ix++] = '!/' + context + '/' + dirName + '/**';
		}
		if (pathStatic) {
			rules[ix++] = '!/static/**';
		}
		if (pathShowcase) {
			rules[ix++] = '!/static/showcase/**';
		}
		if (pathSpa) {
			rules[ix++] = '!/index.html';
			rules[ix++] = '!/broken/**';
			rules[ix++] = '!/jsx/**';
		}
		rules[ix++] = '**';
		return rules;
	};

	this.createWatchPath = function () {
		var path = [];
		var ix = 0;
		for (var i in dir) {
			var dirName = dir[i];
			path[ix++] = './' + project + '/src/main/webapp/' + dirName + '/**/*.*';
		}
		if (pathStatic) {
			path[ix++] = pathStatic + '/**/*.*';
		}
		if (pathShowcase) {
			path[ix++] = pathShowcase + '/**/*.*';
		}
		if (pathSpa) {
			path[ix++] = pathSpa + '/index.html';
			path[ix++] = pathSpa + '/broken/**/*.*';
			path[ix++] = pathSpa + '/jsx/**/*.*';
		}
		return path;
	};

	this.createServer = function (targetServer) {
		var _routes = this.createRoutes();
		var _rules = this.createRules();
		gutil.log('Routes:', _routes);
		var server = {
			baseDir: [],
			routes: _routes
		};
		server.middleware = proxy(_rules, {
			target: targetServer,
			changeOrigin: true,
			ws: true,
			//logLevel:'info'
			onProxyRes: function (proxyRes, req, res) {
				gutil.log('Proxy for:', req.url);
			}
		});
		return server;
	};
}

module.exports = function (app, mod, path) {
	gutil.log('Create Config for: ' + app + '-' + mod + ' = ' + path);
	return new SpaProxy(app, mod, path);
};
