function changeNavbarMode(mode) {
    if (mode == 'bigLogo') {
        document.querySelector('#big-nav-logo').classList.remove('hide');
        document.querySelector('#small-nav-logo').classList.add('hide');
    } else if (mode == 'smallLogo') {
        document.querySelector('#big-nav-logo').classList.add('hide');
        document.querySelector('#small-nav-logo').classList.remove('hide');
    }
}

document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        changeNavbarMode('smallLogo');
    } else {
        changeNavbarMode('bigLogo');
    }
});
