const axios = require('axios')
const moment = require('moment')
require('colors')

const replaceSpace = (str) => {
  if (/^(\w+\s?)*\s*$/.test(str)) {
    return str.replace(/\s+$/, ' ')
  }
  return str
}

const replaceChar = (str) => {
  return replaceSpace(str).replace(/[^a-zA-Z ]/g, '')
}

const replaceNumber = (str) => {
  return str.replace(/[^0-9]/g, '')
}

const main = async () => {
  try {
    const { data } = await axios.get('http://xxxxx/web_status')
    const [ connection_active , , , connection_detail ] = data.split('\n')
    console.log(`(${moment().format('HH:mm:ss')}) ${replaceSpace(replaceChar(connection_active))}: ${`${replaceNumber(connection_active)}`.green.bold} | ${connection_detail}`)
  } catch (err) {
    console.log(`(${moment().format('HH:mm:ss')}) ERROR: ${`${err.message}`.red.bold}`)
  }
}

setInterval(function () {
  main()
}, 5000)