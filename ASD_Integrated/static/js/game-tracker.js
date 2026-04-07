// Universal Game Tracker - Works for ALL games
class GameStats {
    constructor(gameId) {
        this.gameId = gameId;
        this.correct = 0;
        this.wrong = 0;
        this.score = 0;
        this.level = 1;
        this.loadFromStorage();
        this.createDisplay();
        this.setupAutoDetection();
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
        const correctEl = document.getElementById('stats-correct');
        const wrongEl = document.getElementById('stats-wrong');
        const scoreEl = document.getElementById('stats-score');
        const levelEl = document.getElementById('stats-level');
        if (correctEl) correctEl.textContent = this.correct;
        if (wrongEl) wrongEl.textContent = this.wrong;
        if (scoreEl) scoreEl.textContent = this.score;
        if (levelEl) levelEl.textContent = this.level;
    }

    addCorrect(points = 10) {
        this.correct++;
        this.score += points;
        this.saveToStorage();
        this.updateDisplay();
        this.showFeedback('✅ Correct! +' + points + ' points', '#d4edda', '#155724');
        this.checkLevelUp();
    }

    addWrong() {
        this.wrong++;
        this.score = Math.max(0, this.score - 5);
        this.saveToStorage();
        this.updateDisplay();
        this.showFeedback('❌ Wrong! -5 points', '#f8d7da', '#721c24');
    }

    levelUp() {
        this.level++;
        this.saveToStorage();
        this.updateDisplay();
        this.showCelebration();
    }

    checkLevelUp() {
        if (this.correct > 0 && this.correct % 5 === 0) {
            this.levelUp();
        }
    }

    showFeedback(message, bgColor, textColor) {
        let feedback = document.getElementById('game-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'game-feedback';
            feedback.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 24px;
                border-radius: 50px;
                font-size: 1.2em;
                z-index: 1000;
                font-weight: bold;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(feedback);
        }
        feedback.textContent = message;
        feedback.style.backgroundColor = bgColor;
        feedback.style.color = textColor;
        feedback.style.opacity = '1';
        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 1500);
    }

    showCelebration() {
        const celebration = document.createElement('div');
        celebration.innerHTML = '🎉 LEVEL UP! 🎉';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2em;
            background: linear-gradient(135deg, gold, orange);
            padding: 15px 30px;
            border-radius: 50px;
            z-index: 1000;
            animation: fadeOut 2s forwards;
            font-weight: bold;
            color: white;
            white-space: nowrap;
        `;
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 2000);
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = '⭐';
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-20px';
                confetti.style.fontSize = Math.random() * 15 + 10 + 'px';
                confetti.style.animation = 'fall 2s linear forwards';
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 2000);
            }, i * 60);
        }
    }

    setupAutoDetection() {
        // Intercept all click events to detect correct/wrong answers
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // Check if clicked element or parent has correct/wrong indicators
            let element = target;
            while (element && element !== document.body) {
                const text = (element.textContent || '').toLowerCase();
                const classes = element.className || '';
                
                // Detect correct answer
                if (classes.includes('correct') || classes.includes('right') || 
                    text.includes('correct') || text.includes('✓') ||
                    (element.style.background && element.style.background.includes('#d4edda'))) {
                    this.addCorrect();
                    break;
                }
                // Detect wrong answer
                else if (classes.includes('wrong') || classes.includes('incorrect') || 
                         text.includes('wrong') || text.includes('✗') ||
                         (element.style.background && element.style.background.includes('#f8d7da'))) {
                    this.addWrong();
                    break;
                }
                element = element.parentElement;
            }
        });
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fall { to { transform: translateY(100vh); opacity: 0; } }
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
    }
`;
document.head.appendChild(style);
