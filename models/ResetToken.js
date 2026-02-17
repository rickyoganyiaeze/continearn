const mongoose = require('mongoose');
const crypto = require('crypto');

const ResetTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800 // Token expires in 30 minutes (1800 seconds)
  }
});

ResetTokenSchema.pre('save', async function(next) {
  if (this.isModified('token')) {
    this.token = crypto.createHash('sha256').update(this.token).digest('hex');
  }
  next();
});

module.exports = mongoose.model('ResetToken', ResetTokenSchema);