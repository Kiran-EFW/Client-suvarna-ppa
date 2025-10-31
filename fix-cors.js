#!/usr/bin/env node
// Fix CORS in server.js
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2] || './server.js';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/localhost:5173/g, '35.225.94.127');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed CORS');


