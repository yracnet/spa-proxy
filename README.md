# spa-proxy
SPA Proxy FrondEnd

This module add proxy for SPA PROJECT based in MAVEN Directory

## Required:

1. SPA: Maven SPA Project with the main script
2. STATIC: Maven STATIC Project with global resources
3. SHOWCASE: Maven SHOWCASE Project with examples

## Used:

### 1. Add in devDependencies
```
"spa-proxy": "^1.0.7"
```
### 2. Add in gulpfile.js
```
var spaProxy = require('spa-proxy');
```
### 3. Create a config 
```
spaProxy = spaProxy('#PREFIX-PROJECT#', '#SUFIX-PROJECT#', '#CONTEXT-PATH#')  
```
#### Example: 
Maven POM Name: example-demo.

Maven WEB Name: example-demo-web.
```
spaProxy = spaProxy('example', 'demo')
```
Maven with other context path
```
spaProxy = spaProxy('example', 'demo', 'other-path')
```


