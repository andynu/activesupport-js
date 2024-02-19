Once upon a time there was prototype.js and activesupport.js
Both have been long abandoned.

I'm curious what activesupport.js would look like today with modern ES2024
javascript and ES Modules.


Testing with Jest and ES Modules
https://jestjs.io/docs/ecmascript-modules
```
node --experimental-vm-modules node_modules/jest/bin/jest.js
```
or
```
NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest
```
