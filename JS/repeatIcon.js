document.addEventListener('DOMContentLoaded', function() {
  var repeatIcon = document.querySelector('.fa-repeat');

  repeatIcon.addEventListener('click', function() {
    var iconText = repeatIcon.querySelector('span').textContent;

    if (iconText === 'repeat') {
      repeatIcon.querySelector('span').textContent = 'no-repeat';
    } else {
      repeatIcon.querySelector('span').textContent = 'repeat';
    }
  });
});