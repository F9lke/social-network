const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                type: String
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                type: String
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = News = mongoose.model('news', NewsSchema);