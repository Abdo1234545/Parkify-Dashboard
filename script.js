document.addEventListener('DOMContentLoaded', () => {
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
            if (usernameInput && usernameInput.value) {
                sessionStorage.setItem('current_username', usernameInput.value);
            }
            window.location.href = 'dashboard.html';
        });
    }

    const displayUserNameTop = document.getElementById('displayUserNameTop');
    const displayUserNameDropdown = document.getElementById('displayUserNameDropdown');

    if (displayUserNameTop && displayUserNameDropdown) {
        const storedName = sessionStorage.getItem('current_username') || 'Guest User';
        displayUserNameTop.textContent = storedName;
        displayUserNameDropdown.textContent = storedName;
    }

    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('current_username');
            window.location.href = 'login.html';
        });
    }

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
});