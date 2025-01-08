const registerEndPoint = require('./register')
const loginEndPoint = require('./login')
const messageEndPoint = require('./message')
const postEndPoint = require('./post')
const eventEndPoint = require('./event')
const followEndPoint = require('./follow')
const postUserEndPoint = require('./postuser')
const commentEndPoint = require('./comment')
const likeEndPoint = require('./like')
const userEndPoint = require('./user')
const notificationEndpoint = require('./notification')
const chatbotEndpoint = require('./chatbot')

function api(app) {

    app.post('/api/v1/register', registerEndPoint)
    
    app.post('/api/v1/login', loginEndPoint)
    app.get('/api/v1/login', loginEndPoint)

    app.use('/api/v1/message', messageEndPoint)
    app.use('/api/v1/post', postEndPoint)
    app.use('/api/v1/event', eventEndPoint)
    app.use('/api/v1/follow', followEndPoint)
    app.use('/api/v1/postuser',postUserEndPoint)
    app.use('/api/v1/like',likeEndPoint)
    app.use('/api/v1/comment',commentEndPoint)
    app.use('/api/v1/user', userEndPoint)
    app.use('/api/v1/notification', notificationEndpoint)
    
    app.use('/api/v1/chatbot', chatbotEndpoint)
}

module.exports = api