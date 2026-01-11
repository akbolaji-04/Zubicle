document.addEventListener('DOMContentLoaded', () => {

    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 150;
            if (revealtop < windowheight - revealpoint) {
                reveals[i].classList.add('active');
            }
        }
    }
    window.addEventListener('scroll', reveal);
    reveal();

    const tiltElement = document.getElementById('tiltElement');
    const tiltWrapper = document.querySelector('.tilt-wrapper');

    if(tiltWrapper && tiltElement) {
        tiltWrapper.addEventListener('mousemove', (e) => {
            const rect = tiltWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            tiltElement.style.transform = `rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
        });

        tiltWrapper.addEventListener('mouseleave', () => {
            tiltElement.style.transition = 'transform 0.5s ease';
            tiltElement.style.transform = 'rotateX(0deg) rotateY(0deg)';
            setTimeout(() => { tiltElement.style.transition = 'transform 0.1s ease-out'; }, 500);
        });
    }

    window.openTab = function(tabName, btnElement) {
        const screens = document.querySelectorAll('.screen-img');
        screens.forEach(screen => screen.classList.remove('active'));
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        btnElement.classList.add('active');
    }

    const loginBtns = document.querySelectorAll('.js-open-login');
    const modal = document.querySelector('.modal-overlay');
    const loginForm = document.getElementById('loginForm');

    if(loginBtns) {
        loginBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        }));
    }

    if(modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) modal.classList.remove('active');
        });
    }

    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullName').value;

            localStorage.setItem('zubicleUser', name);

            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Logging in...';

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
});