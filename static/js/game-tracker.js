// Game Tracker with Celebrations
class GameStats {
    constructor(gameId) {
        this.gameId = gameId;
        this.correct = 0;
        this.wrong = 0;
        this.score = 0;
        this.level = 1;
        this.loadFromStorage();
        this.createDisplay();
    }

    loadFromStorage() {
        const data = localStorage.getItem(`game_${this.gameId}`);
        if (data) {
            const saved = JSON.parse(data);
            this.correct = saved.correct || 0;
            this.wrong = saved.wrong || 0;
            this.score = saved.score || 0;
            this.level = saved.level || 1;
        }
    }

    saveToStorage() {
        localStorage.setItem(`game_${this.gameId}`, JSON.stringify({
            correct: this.correct,
            wrong: this.wrong,
            score: this.score,
            level: this.level,
            lastPlayed: new Date().toISOString()
        }));
    }

    createDisplay() {
        if (document.getElementById('game-stats')) return;
        
        const container = document.querySelector('.container') || document.body;
        const statsDiv = document.createElement('div');
        statsDiv.id = 'game-stats';
        statsDiv.style.cssText = `
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            padding: 15px;
            border-radius: 20px;
            margin-bottom: 20px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        statsDiv.innerHTML = `
            <div style="background: white; padding: 8px; border-radius: 12px;">
                <div style="font-size: 2em; font-weight: bold; color: #28a745;" id="stats-correct">0</div>
                <div style="font-size: 0.8em;">✅ Correct</div>
            </div>
            <div style="background: white; padding: 8px; border-radius: 12px;">
                <div style="font-size: 2em; font-weight: bold; color: #dc3545;" id="stats-wrong">0</div>
                <div style="font-size: 0.8em;">❌ Wrong</div>
            </div>
            <div style="background: white; padding: 8px; border-radius: 12px;">
                <div style="font-size: 2em; font-weight: bold; color: #ffc107;" id="stats-score">0</div>
                <div style="font-size: 0.8em;">⭐ Score</div>
            </div>
            <div style="background: white; padding: 8px; border-radius: 12px;">
                <div style="font-size: 2em; font-weight: bold; color: #17a2b8;" id="stats-level">1</div>
                <div style="font-size: 0.8em;">📈 Level</div>
            </div>
        `;
        container.insertBefore(statsDiv, container.firstChild);
        this.updateDisplay();
    }

    updateDisplay() {
        if (document.getElementById('stats-correct')) document.getElementById('stats-correct').textContent = this.correct;
        if (document.getElementById('stats-wrong')) document.getElementById('stats-wrong').textContent = this.wrong;
        if (document.getElementById('stats-score')) document.getElementById('stats-score').textContent = this.score;
        if (document.getElementById('stats-level')) document.getElementById('stats-level').textContent = this.level;
    }

    addCorrect(points = 10) {
        this.correct++;
        this.score += points;
        this.saveToStorage();
        this.updateDisplay();
        this.showCelebration('correct');
        this.checkLevelUp();
    }

    addWrong() {
        this.wrong++;
        this.score = Math.max(0, this.score - 5);
        this.saveToStorage();
        this.updateDisplay();
    }

    levelUp() {
        this.level++;
        this.saveToStorage();
        this.updateDisplay();
        this.showCelebration('levelup');
    }

    checkLevelUp() {
        if (this.correct > 0 && this.correct % 5 === 0) {
            this.levelUp();
        }
    }

    showCelebration(type) {
        // Create balloons and stars
        const celebrationDiv = document.createElement('div');
        celebrationDiv.style.position = 'fixed';
        celebrationDiv.style.top = '0';
        celebrationDiv.style.left = '0';
        celebrationDiv.style.width = '100%';
        celebrationDiv.style.height = '100%';
        celebrationDiv.style.pointerEvents = 'none';
        celebrationDiv.style.zIndex = '9999';
        document.body.appendChild(celebrationDiv);
        
        const count = type === 'levelup' ? 20 : 10;
        
        // Balloons
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                balloon.textContent = ['🎈', '🎈', '🎈', '🎉'][Math.floor(Math.random() * 4)];
                balloon.style.position = 'absolute';
                balloon.style.bottom = '-50px';
                balloon.style.left = Math.random() * 100 + '%';
                balloon.style.fontSize = (Math.random() * 30 + 20) + 'px';
                balloon.style.animation = 'floatUp 3s ease-out forwards';
                celebrationDiv.appendChild(balloon);
                setTimeout(() => balloon.remove(), 3000);
            }, i * 80);
        }
        
        // Stars
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.textContent = ['⭐', '🌟', '✨'][Math.floor(Math.random() * 3)];
                star.style.position = 'absolute';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.fontSize = (Math.random() * 20 + 15) + 'px';
                star.style.animation = 'twinkle 1s ease-out forwards';
                celebrationDiv.appendChild(star);
                setTimeout(() => star.remove(), 1000);
            }, i * 50);
        }
        
        setTimeout(() => celebrationDiv.remove(), 4000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes twinkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);
