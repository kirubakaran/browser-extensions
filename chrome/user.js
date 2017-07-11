import { read } from './cookies'

export function auth (callback) {
  if (localStorage['token']) {
    return callback()
  }

  login(callback)
}

export function login (callback) {
  const result = {};
  read("token", (error, value) => {
    if (!value) return callback(new Error('Token isn\'t set'))

    localStorage['token'] = value

    read("name", (error, value) => {
      if (!value) return callback(new Error('Name isn\'t set'))
      result.name = value;

      localStorage['name'] = value

      callback()
    })
  })
}
