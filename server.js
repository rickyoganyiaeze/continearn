require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');

const User = require('./models/User');
const Withdrawal = require('./models/Withdrawal');
const ResetToken = require('./models/ResetToken');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // <--- Change this to true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Game Levels Configuration
const TICTACTOE_LEVELS = [
  { level: 1, coins: 20, naira: 0.40, difficulty: 'Very Easy' },
  { level: 2, coins: 30, naira: 0.60, difficulty: 'Easy' },
  { level: 3, coins: 45, naira: 0.90, difficulty: 'Easy' },
  { level: 4, coins: 65, naira: 1.30, difficulty: 'Medium' },
  { level: 5, coins: 90, naira: 1.80, difficulty: 'Medium' },
  { level: 6, coins: 120, naira: 2.40, difficulty: 'Medium' },
  { level: 7, coins: 155, naira: 3.10, difficulty: 'Hard' },
  { level: 8, coins: 200, naira: 4.00, difficulty: 'Hard' },
  { level: 9, coins: 250, naira: 5.00, difficulty: 'Hard' },
  { level: 10, coins: 310, naira: 6.20, difficulty: 'Very Hard' },
  { level: 11, coins: 380, naira: 7.60, difficulty: 'Very Hard' },
  { level: 12, coins: 460, naira: 9.20, difficulty: 'Expert' },
  { level: 13, coins: 550, naira: 11.00, difficulty: 'Expert' },
  { level: 14, coins: 650, naira: 13.00, difficulty: 'Expert' },
  { level: 15, coins: 760, naira: 15.20, difficulty: 'Master' },
  { level: 16, coins: 880, naira: 17.60, difficulty: 'Master' },
  { level: 17, coins: 1010, naira: 20.20, difficulty: 'Master' },
  { level: 18, coins: 3000, naira: 60.00, difficulty: 'Legend' },
  { level: 19, coins: 5000, naira: 100.00, difficulty: 'Legend' },
  { level: 20, coins: 10000, naira: 200.00, difficulty: 'Final Boss' }
];

const TAPTAP_LEVELS = [
  { level: 1, time: 30, taps: 20, coins: 15, naira: 0.30 },
  { level: 2, time: 30, taps: 30, coins: 25, naira: 0.50 },
  { level: 3, time: 35, taps: 40, coins: 35, naira: 0.70 },
  { level: 4, time: 35, taps: 55, coins: 50, naira: 1.00 },
  { level: 5, time: 60, taps: 70, coins: 70, naira: 1.40 },
  { level: 6, time: 60, taps: 90, coins: 95, naira: 1.90 },
  { level: 7, time: 45, taps: 80, coins: 120, naira: 2.40 },
  { level: 8, time: 50, taps: 100, coins: 150, naira: 3.00 },
  { level: 9, time: 55, taps: 120, coins: 190, naira: 3.80 },
  { level: 10, time: 90, taps: 150, coins: 240, naira: 4.80 },
  { level: 11, time: 60, taps: 140, coins: 300, naira: 6.00 },
  { level: 12, time: 65, taps: 160, coins: 380, naira: 7.60 },
  { level: 13, time: 70, taps: 180, coins: 480, naira: 9.60 },
  { level: 14, time: 75, taps: 200, coins: 600, naira: 12.00 },
  { level: 15, time: 80, taps: 220, coins: 750, naira: 15.00 },
  { level: 16, time: 85, taps: 250, coins: 950, naira: 19.00 },
  { level: 17, time: 90, taps: 280, coins: 1200, naira: 24.00 },
  { level: 18, time: 90, taps: 320, coins: 2000, naira: 40.00 },
  { level: 19, time: 100, taps: 380, coins: 3500, naira: 70.00 },
  { level: 20, time: 120, taps: 500, coins: 10000, naira: 200.00 }
];
const RPS_LEVELS = [
  { level: 1, coins: 20, naira: 0.40, difficulty: 'Very Easy' },
  { level: 2, coins: 30, naira: 0.60, difficulty: 'Very Easy' },
  { level: 3, coins: 40, naira: 0.80, difficulty: 'Easy' },
  { level: 4, coins: 50, naira: 1.00, difficulty: 'Easy' },
  { level: 5, coins: 70, naira: 1.40, difficulty: 'Easy-Medium' },
  { level: 6, coins: 100, naira: 2.00, difficulty: 'Medium' },
  { level: 7, coins: 130, naira: 2.60, difficulty: 'Medium' },
  { level: 8, coins: 160, naira: 3.20, difficulty: 'Medium' },
  { level: 9, coins: 200, naira: 4.00, difficulty: 'Medium-Hard' },
  { level: 10, coins: 250, naira: 5.00, difficulty: 'Hard' },
  { level: 11, coins: 300, naira: 6.00, difficulty: 'Hard' },
  { level: 12, coins: 400, naira: 8.00, difficulty: 'Hard' },
  { level: 13, coins: 500, naira: 10.00, difficulty: 'Very Hard' },
  { level: 14, coins: 650, naira: 13.00, difficulty: 'Very Hard' },
  { level: 15, coins: 800, naira: 16.00, difficulty: 'Very Hard' },
  { level: 16, coins: 1000, naira: 20.00, difficulty: 'Expert' },
  { level: 17, coins: 1250, naira: 25.00, difficulty: 'Expert' },
  { level: 18, coins: 1500, naira: 30.00, difficulty: 'Expert' },
  { level: 19, coins: 1750, naira: 35.00, difficulty: 'Expert' },
  { level: 20, coins: 2000, naira: 40.00, difficulty: 'Final Level' }
];
// ===================== MIDDLEWARE =====================

// Standard Auth Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

// Admin Auth Middleware (Replaces Secret Key check)
const adminAuth = async (req, res, next) => {
  try {
    // 1. Verify Login Token
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // 2. Check if User is Admin
    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Admin access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};

// ===================== AUTH ROUTES =====================

// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, phone, password, referralCode } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      });
    }

    // Create user
    const user = new User({ username, email, phone, password });

    // CHECK: Is this the Admin Email?
    if (process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL) {
      user.isAdmin = true;
    }

    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        user.referrer = referrer._id;
        // Give new user bonus (50 coins)
        user.coins = 50;
        user.naira = 1; // 50 coins = ₦1
        // Give referrer bonus (100 coins)
        referrer.coins += 100;
        referrer.naira += 2; // 100 coins = ₦2
        referrer.referrals.push(user._id);
        await referrer.save();
      }
    }

    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        coins: user.coins,
        naira: user.naira,
        referralCode: user.referralCode,
        isAdmin: user.isAdmin // Return admin status
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }]
    }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    user.lastLogin = Date.now();
    user.isOnline = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        coins: user.coins,
        naira: user.naira,
        referralCode: user.referralCode,
        isAdmin: user.isAdmin // Return admin status
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save hashed token
    await ResetToken.deleteMany({ user: user._id });
    const resetTokenDoc = new ResetToken({
      user: user._id,
      token: resetToken
    });
    await resetTokenDoc.save();

    // Send email
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password.html?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Continearn - Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981;">Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <a href="${resetUrl}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">Reset Password</a>
          <p>This link will expire in 30 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    });

    res.json({ success: true, message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const resetTokenDoc = await ResetToken.findOne({ token: hashedToken });

    if (!resetTokenDoc) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    const user = await User.findById(resetTokenDoc.user);
    user.password = password;
    await user.save();

    await ResetToken.deleteMany({ user: user._id });

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Logout
app.post('/api/auth/logout', auth, async (req, res) => {
  try {
    req.user.isOnline = false;
    await req.user.save();
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Accept Privacy Policy
app.post('/api/auth/accept-privacy', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.acceptedPrivacy = true;
    await user.save();
    res.json({ success: true, message: 'Privacy policy accepted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// Get Current User
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('referrals', 'username createdAt')
      .populate('referrer', 'username');

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        coins: user.coins,
        naira: user.naira,
        referralCode: user.referralCode,
        referralLink: user.getReferralLink(),
        referrals: user.referrals,
        referrer: user.referrer,
        bankName: user.bankName,
        accountName: user.accountName,
        accountNumber: user.accountNumber,
        gameProgress: user.gameProgress,
        totalReferrals: user.referrals.length,
        isAdmin: user.isAdmin, // Return admin status
        acceptedPrivacy: user.acceptedPrivacy
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===================== GAME ROUTES =====================

// Get Game Levels
app.get('/api/games/levels', auth, (req, res) => {
  res.json({
    success: true,
    ticTacToe: TICTACTOE_LEVELS,
    tapTap: TAPTAP_LEVELS
  });
});

// Get User Game Progress
app.get('/api/games/progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      progress: user.gameProgress,
      coins: user.coins,
      naira: user.naira
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Claim Tic-Tac-Toe Reward
app.post('/api/games/tictactoe/claim', auth, async (req, res) => {
  try {
    const { level } = req.body;
    const user = await User.findById(req.user._id);

    if (level > user.gameProgress.ticTacToe.highestLevel) {
      return res.status(400).json({ success: false, message: 'Level not unlocked' });
    }

    const levelData = TICTACTOE_LEVELS[level - 1];
    if (!levelData) {
      return res.status(400).json({ success: false, message: 'Invalid level' });
    }

    user.coins += levelData.coins;
    user.naira += levelData.naira;

    if (level >= user.gameProgress.ticTacToe.currentLevel && level < 20) {
      user.gameProgress.ticTacToe.currentLevel = level + 1;
      user.gameProgress.ticTacToe.highestLevel = Math.max(
        user.gameProgress.ticTacToe.highestLevel,
        level + 1
      );
    }

    await user.save();

    res.json({
      success: true,
      message: `Claimed ${levelData.coins} coins (₦${levelData.naira.toFixed(2)})`,
      coins: user.coins,
      naira: user.naira,
      progress: user.gameProgress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Claim Tap-Tap Reward
app.post('/api/games/taptap/claim', auth, async (req, res) => {
  try {
    const { level, taps, timeTaken } = req.body;
    const user = await User.findById(req.user._id);

    if (level > user.gameProgress.tapTap.highestLevel) {
      return res.status(400).json({ success: false, message: 'Level not unlocked' });
    }

    const levelData = TAPTAP_LEVELS[level - 1];
    if (!levelData) {
      return res.status(400).json({ success: false, message: 'Invalid level' });
    }

    let bonusCoins = 0;
    if (timeTaken < levelData.time * 0.7) {
      bonusCoins = Math.floor(levelData.coins * 0.25);
    }

    const totalCoins = levelData.coins + bonusCoins;
    const totalNaira = levelData.naira + (bonusCoins * 0.02);

    user.coins += totalCoins;
    user.naira += totalNaira;

    if (level >= user.gameProgress.tapTap.currentLevel && level < 20) {
      user.gameProgress.tapTap.currentLevel = level + 1;
      user.gameProgress.tapTap.highestLevel = Math.max(
        user.gameProgress.tapTap.highestLevel,
        level + 1
      );
    }

    await user.save();

    res.json({
      success: true,
      message: `Claimed ${totalCoins} coins (₦${totalNaira.toFixed(2)})${bonusCoins > 0 ? ` including ${bonusCoins} bonus!` : ''}`,
      coins: user.coins,
      naira: user.naira,
      progress: user.gameProgress,
      bonus: bonusCoins
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Claim RPS Reward
app.post('/api/games/rps/claim', auth, async (req, res) => {
  try {
    const { level } = req.body;
    const user = await User.findById(req.user._id);

    if (level > user.gameProgress.rps.highestLevel) {
      return res.status(400).json({ success: false, message: 'Level not unlocked' });
    }

    const levelData = RPS_LEVELS[level - 1];
    if (!levelData) {
      return res.status(400).json({ success: false, message: 'Invalid level' });
    }

    user.coins += levelData.coins;
    user.naira += levelData.naira;

    if (level >= user.gameProgress.rps.currentLevel && level < 20) {
      user.gameProgress.rps.currentLevel = level + 1;
      user.gameProgress.rps.highestLevel = Math.max(
        user.gameProgress.rps.highestLevel,
        level + 1
      );
    }

    await user.save();

    res.json({
      success: true,
      message: `Claimed ${levelData.coins} coins (₦${levelData.naira.toFixed(2)})`,
      coins: user.coins,
      naira: user.naira,
      progress: user.gameProgress
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===================== WITHDRAWAL ROUTES =====================

// Request Withdrawal
app.post('/api/withdraw/request', auth, async (req, res) => {
  try {
    const { amount, bankName, accountName, accountNumber } = req.body;
    const user = await User.findById(req.user._id);

    // Validate minimum
    if (amount < 1000) {
      return res.status(400).json({ success: false, message: 'Minimum withdrawal is ₦1,000' });
    }

    // Validate balance
    if (amount > user.naira) {
      return res.status(400).json({ success: false, message: "You don't have enough balance" });
    }

    // Check end of month
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    if (now.getDate() < lastDay - 2) {
      return res.status(400).json({
        success: false,
        message: 'Withdrawals are only allowed at the end of the month (last 3 days)'
      });
    }

    // Update user bank details
    user.bankName = bankName;
    user.accountName = accountName;
    user.accountNumber = accountNumber;
    user.naira -= amount;
    await user.save();

    // Create withdrawal request
    const withdrawal = new Withdrawal({
      user: user._id,
      amount,
      bankName,
      accountName,
      accountNumber
    });
    await withdrawal.save();

    res.json({
      success: true,
      message: `Withdrawal request for ₦${amount.toLocaleString()} submitted successfully`,
      withdrawal: {
        id: withdrawal._id,
        amount: withdrawal.amount,
        status: withdrawal.status,
        requestedAt: withdrawal.requestedAt
      },
      newBalance: user.naira
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Withdrawal History
app.get('/api/withdraw/history', auth, async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({ user: req.user._id })
      .sort({ requestedAt: -1 });

    res.json({ success: true, withdrawals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===================== ADMIN ROUTES =====================

// Get All Users
app.get('/api/admin/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .populate('referrer', 'username');

    res.json({
      success: true,
      users: users.map(user => ({
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        bankName: user.bankName,
        accountName: user.accountName,
        accountNumber: user.accountNumber,
        coins: user.coins,
        naira: user.naira,
        totalReferrals: user.referrals.length,
        referrer: user.referrer?.username || 'None',
        status: user.isOnline ? 'Online' : 'Offline', // THIS LINE IS IMPORTANT
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Withdrawals
app.get('/api/admin/withdrawals', adminAuth, async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({})
      .populate('user', 'username email phone')
      .sort({ requestedAt: -1 });

    res.json({ success: true, withdrawals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Withdrawal Status
app.put('/api/admin/withdrawals/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const withdrawal = await Withdrawal.findByIdAndUpdate(
      req.params.id,
      { status, processedAt: Date.now() },
      { new: true }
    );

    if (status === 'rejected') {
      const user = await User.findById(withdrawal.user);
      user.naira += withdrawal.amount;
      await user.save();
    }

    res.json({ success: true, withdrawal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update User
app.put('/api/admin/users/:id', adminAuth, async (req, res) => {
  try {
    const { coins, naira, isOnline } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { coins, naira, isOnline },
      { new: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete User
app.delete('/api/admin/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bank List
app.get('/api/banks', (req, res) => {
  const banks = [
    'Access Bank', 'Citibank', 'Ecobank', 'Fidelity Bank', 'First Bank of Nigeria',
    'First City Monument Bank', 'Guaranty Trust Bank', 'Heritage Bank', 'Keystone Bank',
    'Polaris Bank', 'Providus Bank', 'Stanbic IBTC Bank', 'Standard Chartered Bank',
    'Sterling Bank', 'Titan Trust Bank', 'Union Bank of Nigeria', 'United Bank for Africa',
    'Unity Bank', 'Wema Bank', 'Zenith Bank', 'Opay', 'Kuda Bank', 'PalmPay', 'Moniepoint'
  ].sort();

  res.json({ success: true, banks });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
