# spa-proxy
SPA Proxy FrondEnd

This module add proxy for SPA PROJECT based in MAVEN Directory

## Use:

1. Project Maven: Any Project with same structure:
```
 project-pom/
   project-impl/
   project-web/  //Web Project
   gulpfile.js
```


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


