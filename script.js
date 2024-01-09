window.onscroll = function() { updateScrollProgressBar() };

function updateScrollProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

function updateProgressBarColor(bar, progress) {
    if (progress <= 50) {
        bar.style.backgroundColor = '#ff5733'; // Red for 0-50%
    } else if (progress <= 75) {
        bar.style.backgroundColor = '#ffc107'; // Yellow for 51-75%
    } else {
        bar.style.backgroundColor = '#28a745'; // Green for 76-100%
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var changeButtons = document.querySelectorAll('.change-btn');

    changeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var skillContainer = this.parentElement;
            var progressBar = skillContainer.querySelector('.progress-bar');
            var skill = progressBar.innerText.trim(); // Use the text inside the progress bar to identify the skill
            var change = parseInt(this.getAttribute('data-change'), 10);

            if (progressBar) {
                var currentProgress = parseInt(localStorage.getItem('progress-' + skill) || progressBar.getAttribute('aria-valuenow'), 10);
                var newProgress = currentProgress + change;
                newProgress = newProgress < 0 ? 0 : newProgress > 100 ? 100 : newProgress;

                progressBar.style.width = newProgress + '%';
                progressBar.setAttribute('aria-valuenow', newProgress);
                updateProgressBarColor(progressBar, newProgress);

                localStorage.setItem('progress-' + skill, newProgress);
            }
        });
    });

    // Load and set progress from localStorage
    var progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(function(bar) {
        var skill = bar.innerText.trim(); // Use the text inside the progress bar to identify the skill
        var savedProgress = localStorage.getItem('progress-' + skill);
        if (savedProgress !== null) {
            bar.style.width = savedProgress + '%';
            bar.setAttribute('aria-valuenow', savedProgress);
            updateProgressBarColor(bar, parseInt(savedProgress, 10));
        }
    });
});
