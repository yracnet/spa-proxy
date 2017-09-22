# spa-proxy
SPA Proxy FrondEnd

This module add proxy for SPA PROJECT based in MAVEN Directory

## Required:

1. Project Maven: Any Project with same structure:
```
 project-pom/
   project-impl/ <!--Impl Project-->
   project-web/  <!--Web Project-->
```


## Used:

### 1. Add in devDependencies
```
"spa-proxy": "^1.0.8"
```
### 2. Create a gulpfile.js 
```
var gulp = require('gulp');
var bs = require('browser-sync').create();
var spa = require('spa-proxy')('maven-project-web', '/path-deploy');
```
Create Gulp Task
```
//Create a Browser Sync Server
gulp.task("server", function () {
		var proxyURL = 'http://app.local:8080/';
		bs.init({
				startPath: '/',
				server: spa.createServer(proxyURL),
				online: false,
				browser: ["firefox"],
				open: false,
				ghostMode: false,
				port: 3000
		});
});
//Create a watch change
gulp.task("watch", function () {
		var _watch = spa.createWatchPath();
		console.log("WATCH FOR: ", _watch);
		gulp.watch(_watch, function () {
				bs.reload();
		});
});
//Create a default task
gulp.task("default", ["watch", "server"]);
```


### 3. Create a config 
```
spa = require('spa-proxy')('#MAVEN-PROJECT-WEB#', '#CONTEXT-PATH#')  
```
#### Example: 
Maven POM Name: example-demo.
Maven WEB Name: example-demo-web.
```
spa = require('spa-proxy')('example-demo-web', 'demo')
```
Default Directory to static
```
var spa = require('spa-proxy')('maven-project-web', '/path-deploy');
console.log(' No Proxt Dir: ', spa.noProxy.get()); //part, view, ctrl, css, js
spa.noProxy.add('asset');
console.log(' No Proxt Dir: ', spa.noProxy.get()); //part, view, ctrl, css, js, asset
spa.noProxy.set(['css', 'asset']);
console.log(' No Proxt Dir: ', spa.noProxy.get()); //css, asset

```
Include Maven Project 
```
var spa = require('spa-proxy')('maven-project-web', '/path-deploy');
console.log(' Maven Projects: ', spa.mavenProject.get()); 
//{project: 'maven-project-web', context: '/path-deploy', path: '.'}
spa.mavenProject.add('other-maven-web', '/other-path', '/root/path');
console.log(' Maven Projects: ', spa.mavenProject.get()); 
//{project: 'maven-project-web', context: '/path-deploy', path: '.'}
//{project: 'other-project-web', context: '/other-path', path: '/root/path'}
```


