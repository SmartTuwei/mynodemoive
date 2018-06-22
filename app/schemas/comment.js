var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var ComentSchema = new mongoose.Schema({
    movie:{
        type:ObjectId,
        ref:"Movie"
    }, 
    from:{
        type:ObjectId,
        ref:"User"
    },
    reply:[{
        from:{type:ObjectId,ref:"User"},
        to:{type:ObjectId,ref:"User"},
        content:String
    }],
    to:{type:ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        default:""
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

ComentSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }

    next();
});

ComentSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = ComentSchema;