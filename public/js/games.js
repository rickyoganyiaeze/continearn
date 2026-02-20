// Game Configuration
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

// State
let token = localStorage.getItem('token');
let userData = { coins: 0, naira: 0, gameProgress: { ticTacToe: { currentLevel: 1 }, tapTap: { currentLevel: 1 }, rps: { currentLevel: 1 } } };
let currentGame = 'tictactoe';

// Tic-Tac-Toe State
let tttBoard = ['', '', '', '', '', '', '', '', ''];
let tttCurrentPlayer = 'X';
let tttGameActive = true;

// Tap Tap State
let tapGameActive = false;
let tapCount = 0;
let tapTimer = null;
let tapStartTime = null;

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const gamesContent = document.getElementById('gamesContent');
const coinDisplay = document.getElementById('coinDisplay');
const nairaDisplay = document.getElementById('nairaDisplay');

// Initialize
document.addEventListener('DOMContentLoaded', init);

async function init() {
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();

    if (!data.success) {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    userData = data.user;
    // Ensure RPS progress exists if user is old
    if (!userData.gameProgress.rps) {
      userData.gameProgress.rps = { currentLevel: 1, highestLevel: 1 };
    }

    updateBalanceDisplay();
    renderLevelsTables();
    setupGameTabs();
    setupTicTacToe();
    setupTapTap();

    updateTicTacToeLevelInfo();
    updateTapTapLevelInfo();
    updateRPSLevelInfo();

    loadingOverlay.style.display = 'none';
    gamesContent.style.display = 'block';

  } catch (error) {
    console.error('Init error:', error);
    showToast('Failed to load game data', 'error');
  }
}

function updateBalanceDisplay() {
  coinDisplay.textContent = userData.coins.toLocaleString();
  nairaDisplay.textContent = userData.naira.toFixed(2);
}

function renderLevelsTables() {
  // Tic-Tac-Toe levels
  const tttBody = document.querySelector('#tttLevelsTable tbody');
  tttBody.innerHTML = TICTACTOE_LEVELS.map(l => `
    <tr class="${l.level === userData.gameProgress.ticTacToe.currentLevel ? 'level-current' : ''}">
      <td>${l.level}</td>
      <td>${l.coins}</td>
      <td>₦${l.naira.toFixed(2)}</td>
      <td>${l.difficulty}</td>
    </tr>
  `).join('');

  // RPS levels
  const rpsBody = document.querySelector('#rpsLevelsTable tbody');
  rpsBody.innerHTML = RPS_LEVELS.map(l => `
    <tr class="${l.level === (userData.gameProgress.rps?.currentLevel || 1) ? 'level-current' : ''}">
      <td>${l.level}</td>
      <td>${l.coins}</td>
      <td>₦${l.naira.toFixed(2)}</td>
      <td>${l.difficulty}</td>
    </tr>
  `).join('');

  // Tap Tap levels
  const tapBody = document.querySelector('#tapLevelsTable tbody');
  tapBody.innerHTML = TAPTAP_LEVELS.map(l => `
    <tr class="${l.level === userData.gameProgress.tapTap.currentLevel ? 'level-current' : ''}">
      <td>${l.level}</td>
      <td>${l.time}s</td>
      <td>${l.taps}</td>
      <td>${l.coins}</td>
    </tr>
  `).join('');
}

function setupGameTabs() {
  const tabs = document.querySelectorAll('.games-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const game = tab.dataset.game;
      document.querySelectorAll('.game-container').forEach(c => c.classList.remove('active'));
      document.getElementById(`${game}-container`).classList.add('active');
      currentGame = game;
    });
  });
}

// ===================== TIC-TAC-TOE =====================

function setupTicTacToe() {
  const cells = document.querySelectorAll('.ttt-cell');
  cells.forEach(cell => {
    cell.addEventListener('click', handleTTTCellClick);
  });
  document.getElementById('tttRestart').addEventListener('click', resetTicTacToe);
}

function handleTTTCellClick(e) {
  const index = parseInt(e.target.dataset.index);
  if (tttBoard[index] !== '' || !tttGameActive || tttCurrentPlayer !== 'X') return;
  makeTTTMove(index, 'X');
  if (tttGameActive) setTimeout(computerMove, 500);
}

function makeTTTMove(index, player) {
  tttBoard[index] = player;
  const cell = document.querySelector(`.ttt-cell[data-index="${index}"]`);
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
  cell.disabled = true;

  const winner = checkTTTWinner();
  if (winner) {
    tttGameActive = false;
    if (winner === 'X') {
      document.getElementById('tttStatusText').innerHTML = '<span style="color: var(--success);">You Win!</span>';
      showClaimModal('tictactoe');
    } else if (winner === 'O') {
      document.getElementById('tttStatusText').innerHTML = '<span style="color: var(--error);">Computer Wins!</span>';
    } else {
      document.getElementById('tttStatusText').innerHTML = '<span style="color: var(--warning);">It\'s a Draw!</span>';
    }
  } else {
    tttCurrentPlayer = player === 'X' ? 'O' : 'X';
    updateTurnStatus();
  }
}

function updateTurnStatus() {
  if (tttCurrentPlayer === 'X') {
    document.getElementById('tttStatusText').innerHTML = 'Your turn! You are <span style="color: var(--accent-primary);">X</span>';
  } else {
    document.getElementById('tttStatusText').innerHTML = 'Computer is thinking...';
  }
}

function computerMove() {
  if (!tttGameActive) return;
  const currentLevel = userData.gameProgress.ticTacToe.currentLevel;
  const smartChance = Math.min(100, (currentLevel * 10)); 
  let move;

  if (Math.random() * 100 < smartChance) {
    move = getBestMove();
  } else {
    const emptyCells = tttBoard.map((v, i) => v === '' ? i : null).filter(v => v !== null);
    move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  if (move !== undefined && move !== null) makeTTTMove(move, 'O');
}

function getBestMove() {
  for (let i = 0; i < 9; i++) {
    if (tttBoard[i] === '') {
      tttBoard[i] = 'O';
      if (checkTTTWinner() === 'O') { tttBoard[i] = ''; return i; }
      tttBoard[i] = '';
    }
  }
  for (let i = 0; i < 9; i++) {
    if (tttBoard[i] === '') {
      tttBoard[i] = 'X';
      if (checkTTTWinner() === 'X') { tttBoard[i] = ''; return i; }
      tttBoard[i] = '';
    }
  }
  if (tttBoard[4] === '') return 4;
  const corners = [0, 2, 6, 8].filter(i => tttBoard[i] === '');
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
  const sides = [1, 3, 5, 7].filter(i => tttBoard[i] === '');
  if (sides.length > 0) return sides[Math.floor(Math.random() * sides.length)];
  return null;
}

function checkTTTWinner() {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (tttBoard[a] && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c]) return tttBoard[a];
  }
  if (tttBoard.every(cell => cell !== '')) return 'draw';
  return null;
}

function resetTicTacToe() {
  tttBoard = ['', '', '', '', '', '', '', '', ''];
  tttCurrentPlayer = 'X';
  tttGameActive = true;
  document.querySelectorAll('.ttt-cell').forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.disabled = false;
  });
  updateTurnStatus();
}

function updateTicTacToeLevelInfo() {
  const level = userData.gameProgress.ticTacToe.currentLevel;
  const levelData = TICTACTOE_LEVELS[level - 1] || TICTACTOE_LEVELS[0];
  document.getElementById('tttLevel').textContent = level;
  document.getElementById('tttCoins').textContent = levelData.coins;
  document.getElementById('tttNaira').textContent = levelData.naira.toFixed(2);
  document.getElementById('tttDifficulty').textContent = levelData.difficulty;
}

// ===================== TAP TAP =====================

function setupTapTap() {
  document.getElementById('tapTargetBtn').addEventListener('click', handleTap);
  document.getElementById('startTapGame').addEventListener('click', startTapGame);
  document.getElementById('resetTapGame').addEventListener('click', resetTapGame);
}

function startTapGame() {
  tapGameActive = true;
  tapCount = 0;
  tapStartTime = Date.now();
  const level = userData.gameProgress.tapTap.currentLevel;
  const levelData = TAPTAP_LEVELS[level - 1] || TAPTAP_LEVELS[0];

  document.getElementById('tapCount').textContent = '0';
  document.getElementById('timeLeft').textContent = levelData.time;
  document.getElementById('tapText').textContent = 'TAP!';
  document.getElementById('startTapGame').style.display = 'none';
  document.getElementById('resetTapGame').style.display = 'none';

  let timeLeft = levelData.time;
  tapTimer = setInterval(() => {
    timeLeft--;
    document.getElementById('timeLeft').textContent = timeLeft;
    if (timeLeft <= 0) endTapGame(false);
  }, 1000);
}

function handleTap() {
  if (!tapGameActive) return;
  const btn = document.getElementById('tapTargetBtn');
  btn.classList.add('tapping');
  setTimeout(() => btn.classList.remove('tapping'), 150);
  tapCount++;
  document.getElementById('tapCount').textContent = tapCount;
  const level = userData.gameProgress.tapTap.currentLevel;
  const levelData = TAPTAP_LEVELS[level - 1] || TAPTAP_LEVELS[0];
  if (tapCount >= levelData.taps) endTapGame(true);
}

function endTapGame(won) {
  tapGameActive = false;
  clearInterval(tapTimer);
  document.getElementById('tapText').textContent = won ? 'WIN!' : 'TIME UP!';
  document.getElementById('resetTapGame').style.display = 'inline-flex';
  if (won) {
    const timeTaken = (Date.now() - tapStartTime) / 1000;
    showClaimModal('taptap', timeTaken);
  }
}

function resetTapGame() {
  const level = userData.gameProgress.tapTap.currentLevel;
  const levelData = TAPTAP_LEVELS[level - 1] || TAPTAP_LEVELS[0];
  document.getElementById('tapCount').textContent = '0';
  document.getElementById('timeLeft').textContent = levelData.time;
  document.getElementById('tapText').textContent = 'TAP!';
  document.getElementById('startTapGame').style.display = 'inline-flex';
  document.getElementById('resetTapGame').style.display = 'none';
}

function updateTapTapLevelInfo() {
  const level = userData.gameProgress.tapTap.currentLevel;
  const levelData = TAPTAP_LEVELS[level - 1] || TAPTAP_LEVELS[0];
  document.getElementById('tapLevel').textContent = level;
  document.getElementById('tapTarget').textContent = levelData.taps;
  document.getElementById('tapTime').textContent = levelData.time;
  document.getElementById('tapReward').textContent = levelData.coins;
  document.getElementById('timeLeft').textContent = levelData.time;
}

// ===================== ROCK PAPER SCISSORS =====================

const rpsChoices = ['rock', 'paper', 'scissors'];
const rpsIcons = {
  rock: 'fa-hand-back-fist',
  paper: 'fa-hand',
  scissors: 'fa-hand-scissors'
};

function playRPS(playerChoice) {
  const btns = document.querySelectorAll('.rps-btn');
  btns.forEach(b => b.disabled = true);

  const computerChoice = rpsChoices[Math.floor(Math.random() * 3)];

  document.getElementById('rpsPlayerChoice').innerHTML = `<i class="fas ${rpsIcons[playerChoice]}"></i>`;
  document.getElementById('rpsComputerChoice').innerHTML = `<i class="fas ${rpsIcons[computerChoice]}"></i>`;

  let result = '';

  if (playerChoice === computerChoice) {
    result = 'tie';
    document.getElementById('rpsResultText').innerHTML = `<span style="color: var(--warning);">It's a Tie!</span>`;
    document.getElementById('rpsStatusText').textContent = 'Try again!';
    setTimeout(() => {
      btns.forEach(b => b.disabled = false);
      document.getElementById('rpsPlayerChoice').innerHTML = `<i class="fas fa-question" style="color: var(--fg-muted);"></i>`;
      document.getElementById('rpsComputerChoice').innerHTML = `<i class="fas fa-question" style="color: var(--fg-muted);"></i>`;
      document.getElementById('rpsResultText').textContent = '';
    }, 1500);
  }
  else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'win';
    document.getElementById('rpsResultText').innerHTML = `<span style="color: var(--success);">You Win!</span>`;
    document.getElementById('rpsStatusText').textContent = 'Claim your reward!';
    setTimeout(() => showClaimModal('rps'), 500);
  }
  else {
    result = 'lose';
    document.getElementById('rpsResultText').innerHTML = `<span style="color: var(--error);">You Lose!</span>`;
    document.getElementById('rpsStatusText').textContent = 'Better luck next time!';
    setTimeout(() => {
      btns.forEach(b => b.disabled = false);
      document.getElementById('rpsPlayerChoice').innerHTML = `<i class="fas fa-question" style="color: var(--fg-muted);"></i>`;
      document.getElementById('rpsComputerChoice').innerHTML = `<i class="fas fa-question" style="color: var(--fg-muted);"></i>`;
      document.getElementById('rpsResultText').textContent = '';
      document.getElementById('rpsStatusText').textContent = 'Choose Rock, Paper, or Scissors to play!';
    }, 2000);
  }
}

function updateRPSLevelInfo() {
  const level = userData.gameProgress.rps?.currentLevel || 1;
  const levelData = RPS_LEVELS[level - 1] || RPS_LEVELS[0];
  document.getElementById('rpsLevel').textContent = level;
  document.getElementById('rpsCoins').textContent = levelData.coins;
  document.getElementById('rpsNaira').textContent = levelData.naira.toFixed(2);
  document.getElementById('rpsDifficulty').textContent = levelData.difficulty;
}

// ===================== CLAIM MODAL =====================

function showClaimModal(game, extraData = null) {
  const modal = document.getElementById('claimModal');
  let level, levelData;

  // Determine Level and Data based on game
  if (game === 'tictactoe') {
    level = userData.gameProgress.ticTacToe.currentLevel;
    levelData = TICTACTOE_LEVELS[level - 1];
  } else if (game === 'taptap') {
    level = userData.gameProgress.tapTap.currentLevel;
    levelData = TAPTAP_LEVELS[level - 1];
  } else if (game === 'rps') {
    level = userData.gameProgress.rps?.currentLevel || 1;
    levelData = RPS_LEVELS[level - 1];
  }

  document.getElementById('claimCoins').textContent = levelData.coins;
  document.getElementById('claimNaira').textContent = levelData.naira.toFixed(2);
  document.getElementById('claimMessage').textContent = `You completed Level ${level}!`;

  // Bonus logic for Tap Tap
  if (game === 'taptap' && extraData) {
    const levelInfo = TAPTAP_LEVELS[level - 1];
    if (extraData < levelInfo.time * 0.7) {
      const bonus = Math.floor(levelData.coins * 0.25);
      document.getElementById('bonusText').textContent = `Speed Bonus: +${bonus} coins!`;
      document.getElementById('bonusText').style.display = 'block';
    } else {
      document.getElementById('bonusText').style.display = 'none';
    }
  } else {
    document.getElementById('bonusText').style.display = 'none';
  }

  modal.classList.add('active');
  document.getElementById('claimBtn').onclick = () => claimReward(game, level, extraData);
}

async function claimReward(game, level, extraData = null) {
  const claimBtn = document.getElementById('claimBtn');
  claimBtn.disabled = true;
  claimBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Claiming...';

  try {
    // Determine endpoint and body
    let endpoint, body;
    if (game === 'tictactoe') {
      endpoint = '/api/games/tictactoe/claim';
      body = { level };
    } else if (game === 'taptap') {
      endpoint = '/api/games/taptap/claim';
      body = { level, taps: tapCount, timeTaken: extraData };
    } else if (game === 'rps') {
      endpoint = '/api/games/rps/claim';
      body = { level };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data.success) {
      userData.coins = data.coins;
      userData.naira = data.naira;
      userData.gameProgress = data.progress;

      updateBalanceDisplay();
      renderLevelsTables();
      
      updateTicTacToeLevelInfo();
      updateTapTapLevelInfo();
      updateRPSLevelInfo();
      
      if (game === 'tictactoe') resetTicTacToe();
      
      // Reset RPS UI specifically after claim
      if (game === 'rps') {
        document.querySelectorAll('.rps-btn').forEach(b => b.disabled = false);
        document.getElementById('rpsPlayerChoice').innerHTML = `<i class="fas fa-question" style="color: var(--fg-muted);"></i>`;
        document.getElementById('rpsComputerChoice').innerHTML = `<i class="fas fa-question" style="color: var(--fg-muted);"></i>`;
        document.getElementById('rpsResultText').textContent = '';
        document.getElementById('rpsStatusText').textContent = 'Choose Rock, Paper, or Scissors to play!';
      }

      showToast(data.message, 'success');
      document.getElementById('claimModal').classList.remove('active');
    } else {
      showToast(data.message, 'error');
    }
  } catch (error) {
    showToast('Failed to claim reward', 'error');
  } finally {
    claimBtn.disabled = false;
    claimBtn.innerHTML = '<i class="fas fa-gift"></i> Claim Reward';
  }
}

// ===================== UTILITIES =====================

function showToast(message, type) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} toast-icon"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
