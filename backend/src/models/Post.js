const { json } = require('express');
const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')
mongoose.set('debug', true)

const FashionSocial = mongoose.connection.useDb('FashionSocial');

const PostSchema = new mongoose.Schema({
    userId: {
        type:String,
        require:true,
    },
    email: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    media: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})



const Post = FashionSocial.model('Post', PostSchema)

module.exports = Post








