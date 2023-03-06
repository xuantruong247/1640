const mongoose = require('mongoose')

const ideaSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        max: 255
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    description: {
        type: String,
    },
    content: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    submissionId: {
        type: mongoose.Types.ObjectId,
        ref: 'submission'
    },
    files: [{
        fileName: {
            type: String
        },
        filePath: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    comments: [{
        commentId: {
            type: mongoose.Types.ObjectId,
            ref: 'comment'
        }
    }],
    reactions: [{
        reactionId: {
            type: mongoose.Types.ObjectId,
            ref: 'reaction'
        }
    }],
    views: [{
        viewId: {
            type: mongoose.Types.ObjectId,
            ref: 'view'
        }
    }],
    isActive: {
        type: Boolean,
        default: false
    },
    isAnonymously: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

module.exports = mongoose.model('idea', ideaSchema)