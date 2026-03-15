document.addEventListener('DOMContentLoaded', () => {
    // ================== 1. Login Logic ==================
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#password');
    const loginForm = document.getElementById('loginForm');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const usernameInput = document.getElementById('username');
            const emailInput = document.getElementById('email');
            
            // نحفظ الاسم زي ما المستخدم كتبه بالظبط
            if (usernameInput && usernameInput.value) {
                sessionStorage.setItem('current_username', usernameInput.value);
            }
            // نحفظ الإيميل زي ما المستخدم كتبه بالظبط
            if (emailInput && emailInput.value) {
                sessionStorage.setItem('current_email', emailInput.value);
            }
            window.location.href = 'dashboard.html';
        });
    }

    // ================== 2. Dashboard UI Logic (Profile & Emails) ==================
    const displayUserNameTop = document.getElementById('displayUserNameTop');
    const displayUserNameDropdown = document.getElementById('displayUserNameDropdown');
    const displayUserEmailDropdown = document.getElementById('displayUserEmailDropdown');

    // هنا بنقرأ الداتا وبنحطها في مكانها بدون أي تعديل أو فزلكة
    if (displayUserNameTop || displayUserNameDropdown || displayUserEmailDropdown) {
        const storedName = sessionStorage.getItem('current_username') || 'Admin';
        const storedEmail = sessionStorage.getItem('current_email') || 'admin@grandmall.com';
        
        if(displayUserNameTop) displayUserNameTop.textContent = storedName;
        if(displayUserNameDropdown) displayUserNameDropdown.textContent = storedName;
        if(displayUserEmailDropdown) displayUserEmailDropdown.textContent = storedEmail;
    }

    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('current_username');
            sessionStorage.removeItem('current_email');
            window.location.href = 'login.html';
        });
    }

    // ================== 3. Dashboard Clocks & Alerts ==================
    const liveTimeDisplays = document.querySelectorAll('.liveTime');
    if (liveTimeDisplays.length > 0) {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US');
            liveTimeDisplays.forEach(display => {
                display.textContent = timeString;
            });
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    const userProfileBtn = document.getElementById('userProfileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (userProfileBtn && profileDropdown) {
        userProfileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!userProfileBtn.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }

    const closeAlertBtns = document.querySelectorAll('.close-alert');
    if (closeAlertBtns.length > 0) {
        closeAlertBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const alertBox = this.closest('.alert-box');
                if (alertBox) {
                    alertBox.style.display = 'none';
                }
            });
        });
    }

    // ================== 4. Mobile Menu & Navigation ==================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        function toggleSidebar() {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('show');
        }
        mobileMenuBtn.addEventListener('click', toggleSidebar);
        closeSidebarBtn.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    const navLinks = document.querySelectorAll('.sidebar-nav .nav-item[data-target]');
    const pageViews = document.querySelectorAll('.page-view');

    if (navLinks.length > 0 && pageViews.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                pageViews.forEach(view => view.classList.remove('active'));
                const targetId = link.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    sidebarOverlay.classList.remove('show');
                }
            });
        });
    }

    const pills = document.querySelectorAll('.pill');
    if (pills.length > 0) {
        pills.forEach(pill => {
            pill.addEventListener('click', function() {
                pills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    const liveClocks = document.querySelectorAll('.live-clock');
    if (liveClocks.length > 0) {
        function updateCameraClocks() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour12: false });
            liveClocks.forEach(clock => {
                clock.textContent = timeString;
            });
        }
        updateCameraClocks();
        setInterval(updateCameraClocks, 1000);
    }

    // ================== 5. Parking Spots Modal Logic ==================
    const spotBoxes = document.querySelectorAll('.spot-box');
    const modalOverlay = document.getElementById('spotDetailsModal');
    const closeModalBtns = [document.getElementById('closeModalBtn'), document.getElementById('closeModalFooterBtn')];
    
    const modalSpotId = document.getElementById('modalSpotId');
    const infoSpotId = document.getElementById('infoSpotId');
    const modalSpotStatus = document.getElementById('modalSpotStatus');
    const modalIconBg = document.querySelector('.modal-icon');

    if (spotBoxes.length > 0 && modalOverlay) {
        spotBoxes.forEach(box => {
            box.addEventListener('click', function() {
                const spotId = this.getAttribute('data-id');
                const spotStatus = this.getAttribute('data-status').toLowerCase();
                
                if(modalSpotId) modalSpotId.textContent = spotId;
                if(infoSpotId) infoSpotId.textContent = spotId;
                if(modalSpotStatus) {
                    modalSpotStatus.textContent = spotStatus;
                    modalSpotStatus.className = 'badge-status ' + spotStatus;
                }
                
                if(modalIconBg) {
                    if(spotStatus === 'available') {
                        modalIconBg.style.background = '#ecfdf5';
                        modalIconBg.style.color = '#059669';
                    } else if(spotStatus === 'occupied') {
                        modalIconBg.style.background = '#fee2e2';
                        modalIconBg.style.color = '#dc2626';
                    } else if(spotStatus === 'reserved') {
                        modalIconBg.style.background = '#fffbeb';
                        modalIconBg.style.color = '#d97706';
                    } else {
                        modalIconBg.style.background = '#f3f4f6';
                        modalIconBg.style.color = '#4b5563';
                    }
                }

                modalOverlay.classList.add('show');
            });
        });

        const closeModal = () => modalOverlay.classList.remove('show');
        closeModalBtns.forEach(btn => {
            if(btn) btn.addEventListener('click', closeModal);
        });
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
});