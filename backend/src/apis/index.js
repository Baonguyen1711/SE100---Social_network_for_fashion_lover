const registerEndPoint = require('./register')
const loginEndPoint = require('./login')
const messageEndPoint = require('./message')
const exploreEndPoint = require('./explore')
const eventEndPoint = require('./event')
const followEndPoint = require('./follow')
function api(app) {

    app.post('/api/v1/register', registerEndPoint)
    
    app.post('/api/v1/login', loginEndPoint)
    app.get('/api/v1/login', loginEndPoint)

    app.use('/api/v1/message', messageEndPoint)
    app.use('/api/v1/explore', exploreEndPoint)
    app.use('/api/v1/event', eventEndPoint)
    app.use('/api/v1/follow', followEndPoint)
}

module.exports = api