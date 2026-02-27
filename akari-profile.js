// ============================================
// AKARI WATANABE PROFILE - FOTO BULAT
// ============================================

// Fungsi untuk nambah foto Akari di tempat bulat
function addAkariProfile() {
    // Cari tempat buat foto (di header)
    const header = document.querySelector('.header');
    if (!header) return;
    
    // Cek udah ada foto belum
    if (document.getElementById('akari-foto')) return;
    
    // Buat element foto
    const fotoContainer = document.createElement('div');
    fotoContainer.id = 'akari-foto';
    fotoContainer.innerHTML = `
        <div style="
            width: 120px;
            height: 120px;
            margin: 0 auto 15px auto;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid white;
            box-shadow: 0 5px 20px rgba(255,105,180,0.7);
            position: relative;
            animation: float 3s infinite ease-in-out;
        ">
            <img src="https://i.pinimg.com/736x/3b/3e/7b/3b3e7b9b3b3e7b9b3b3e7b9b3b3e7b9b.jpg" 
                 style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                 "
                 onerror="this.src='https://i.pinimg.com/236x/3b/3e/7b/akari-watanabe.jpg'; this.onerror=null;"
                 alt="Akari Watanabe">
            <div style="
                position: absolute;
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 70%);
                animation: glow 2s infinite;
                pointer-events: none;
            "></div>
        </div>
    `;
    
    // Sisipin di awal header
    header.insertBefore(fotoContainer, header.firstChild);
    
    // Tambah CSS animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Jalankan pas halaman udah loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addAkariProfile);
} else {
    addAkariProfile();
}
