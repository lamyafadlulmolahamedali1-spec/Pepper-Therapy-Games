// Universal Celebration Effects for all games
const Celebration = {
    show: function(type = 'correct') {
        const celebrationDiv = document.createElement('div');
        celebrationDiv.style.position = 'fixed';
        celebrationDiv.style.top = '0';
        celebrationDiv.style.left = '0';
        celebrationDiv.style.width = '100%';
        celebrationDiv.style.height = '100%';
        celebrationDiv.style.pointerEvents = 'none';
        celebrationDiv.style.zIndex = '9999';
        document.body.appendChild(celebrationDiv);
        
        if (type === 'correct') {
            // Balloons
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const balloon = document.createElement('div');
                    balloon.textContent = ['🎈', '🎈', '🎈'][Math.floor(Math.random() * 3)];
                    balloon.style.position = 'absolute';
                    balloon.style.bottom = '-50px';
                    balloon.style.left = Math.random() * 100 + '%';
                    balloon.style.fontSize = (Math.random() * 30 + 20) + 'px';
                    balloon.style.animation = 'floatUp 3s ease-out forwards';
                    celebrationDiv.appendChild(balloon);
                    setTimeout(() => balloon.remove(), 3000);
                }, i * 100);
            }
            
            // Stars
            for (let i = 0; i < 12; i++) {
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
        } else if (type === 'levelup') {
            // Big celebration for level up
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const balloon = document.createElement('div');
                    balloon.textContent = ['🎉', '🎈', '⭐', '🌟', '✨'][Math.floor(Math.random() * 5)];
                    balloon.style.position = 'absolute';
                    balloon.style.bottom = '-50px';
                    balloon.style.left = Math.random() * 100 + '%';
                    balloon.style.fontSize = (Math.random() * 40 + 30) + 'px';
                    balloon.style.animation = 'floatUp 4s ease-out forwards';
                    celebrationDiv.appendChild(balloon);
                    setTimeout(() => balloon.remove(), 4000);
                }, i * 80);
            }
            
            for (let i = 0; i < 25; i++) {
                setTimeout(() => {
                    const star = document.createElement('div');
                    star.textContent = '⭐';
                    star.style.position = 'absolute';
                    star.style.left = Math.random() * 100 + '%';
                    star.style.top = Math.random() * 100 + '%';
                    star.style.fontSize = (Math.random() * 25 + 20) + 'px';
                    star.style.animation = 'twinkle 1.5s ease-out forwards';
                    celebrationDiv.appendChild(star);
                    setTimeout(() => star.remove(), 1500);
                }, i * 60);
            }
        }
        
        setTimeout(() => celebrationDiv.remove(), 4000);
    }
};

// Add animations
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
