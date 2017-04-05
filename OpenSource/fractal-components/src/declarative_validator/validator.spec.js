import validator from './validator';
let validEmail = '384924552@qq.com';

let inValidEmail = '12';

// console.log(validator('email', validEmail));
//
// console.log(validator('email', inValidEmail));

// console.log(validator('min-length[2]', validEmail));
//
// console.log(validator('min-length[3]', inValidEmail));

// console.log(validator('max-length[2]', validEmail));
//
// console.log(validator('max-length[3]', inValidEmail));


// console.log(validator('mobile|min-length[3]|max-length[3]', '15851808077'));

// console.log(compareObjects({1: 1}, {1: 1}))

console.log(validator('required', undefined));