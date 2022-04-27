const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const docsSchema = new Schema({
    title: {
      type: String,
      required:true,
      unique: false
    },
    user : {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
      },
  data: {
    type: Schema.Types.ObjectId,
    ref: 'DocData',
    required: true
    },
  type: {
    type: String,
    sparse:true
  },
  allowedUsers:[
    {
      type: Schema.Types.ObjectId,
        ref: 'User',
        sparse:true
      }
    ],
    lastOpen:{
      type: String,
      sparse:true
    },
  public: {
    type: Boolean,
    default: false
  },
},{timestamps: true})


const Docs = mongoose.model('Docs', docsSchema)
module.exports = Docs;