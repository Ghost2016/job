var axios = require('axios')
var MockAdapter = require('axios-mock-adapter')

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios, { delayResponse: 2000 })
// alert('1')
// mock.onAny().passThrough()
// Mock any GET request to /users
// arguments for reply are (status, data, headers)
// mock.onGet('/users', { params: { searchText: 'John' }}).reply(200, {
//   users: [
//     { id: 1, name: 'John Smith' }
//   ]
// })

// network error
// mock.onGet('/users').networkError()

// timeout
// mock.onGet('/users').timeout()

// Passing a function to reply
// mock.onGet('/users').reply(function(config) {
//   // `config` is the axios config and contains things like the url
//   console.log(config)
//   // return an array in the form of [status, data, headers]
//   return [200, {
//     users: [
//       { id: 1, name: 'John Smith' }
//     ]
//   }]
// })

// restore removes the mocking from the axios instance completely
// mock.restore()

// reset only removes all mock handlers that were added with onGet, onPost, etc. but leaves the mocking in place.
// mock.reset()

// Using a regex
// mock.onGet(/\/users\/\d+/).reply(function(config) {
//   // the actual id can be grabbed from config.url
//   console.log(config.url)
//   return [200, {}]
// })

// Specify no path to match by verb alone
// Reject all POST requests with HTTP 500
mock.onGet().reply(
  config => {
    console.log(JSON.stringify(config))
    return [200, {
      name: 'pig'
    }]
  }
)

// Chaining is also supported
// mock
//   .onGet('/users').reply(200, {
//     users: [
//       { id: 1, name: 'John Smith' }
//     ]
//   })
//   .onGet('/posts').reply(200, {
//     users: [
//       { id: 1, name: 'John Smith' }
//     ]
//   })
// .replyOnce() can be used to let the mock only reply once
// mock
//   .onGet('/users').replyOnce(200, {
//     users: [
//       { id: 1, name: 'John Smith' }
//     ]
//   })
//   .onGet('/users').replyOnce(500)
  // After the first request to /users, this handler is removed
  // The second request to /users will have status code 500
  // Any following request would return a 404 since there are
  // no matching handlers left
// axios.get(baseURL + '/users/123', { params: { searchText: 'John' }})
//   .then(function(response) {
//     console.log(response.data)
//   })

// axios.post('/users', { params: { searchText: 'John' }})
//   .then(function(response) {
//     console.log(response.data)
//   })
