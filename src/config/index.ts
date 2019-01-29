let NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === undefined) {
  NODE_ENV = 'development'
}

console.log(`当前开发环境:${NODE_ENV}`)

const config = require(`./${NODE_ENV}.js`).default
export default config; 
