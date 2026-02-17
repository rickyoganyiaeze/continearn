const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  coins: {
    type: Number,
    default: 0
  },
  naira: {
    type: Number,
    default: 0
  },
  referrals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  referralCode: {
    type: String,
    unique: true
  },
  bankName: {
    type: String,
    default: ''
  },
  accountName: {
    type: String,
    default: ''
  },
  accountNumber: {
    type: String,
    default: ''
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isOnline: {
    type: Boolean,
    default: true
  },
  // This is the Admin field added correctly
  isAdmin: {
    type: Boolean,
    default: false
  },
   acceptedPrivacy: {
    type: Boolean,
    default: false
  },
  gameProgress: {
    ticTacToe: {
      currentLevel: { type: Number, default: 1 },
      highestLevel: { type: Number, default: 1 }
    },
    tapTap: {
      currentLevel: { type: Number, default: 1 },
      highestLevel: { type: Number, default: 1 }
    },

    rps: {
      currentLevel: { type: Number, default: 1 },
      highestLevel: { type: Number, default: 1 }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate referral code before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') && this.referralCode) {
    return next();
  }

  if (!this.referralCode) {
    this.referralCode = this.username.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.random().toString(36).substring(2, 8);
  }

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getReferralLink = function() {
  return `https://continearn.name.ng/signup.html?invite=${this.referralCode}`;
};


module.exports = mongoose.model('User', UserSchema);

