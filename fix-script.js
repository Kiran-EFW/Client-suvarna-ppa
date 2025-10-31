#!/usr/bin/env node
// Fix create-test-accounts.js
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2] || './create-test-accounts.js';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/await prisma\.\(\)/g, 'await prisma.$disconnect()');
content = content.replace(/prisma\.\(\)/g, 'prisma.$disconnect()');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed create-test-accounts.js');


