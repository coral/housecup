var logos = ['webhallen.png', 'strafe.png', 'xtrfy.png', 'viagame.png', 'blizzard.png'];
var currentLogo = 0;

$( document ).ready(function() {
    renderLogos();
    console.log("Start sponsor roll")
});

function renderLogos()
{
    $('.plate-sponsor-image').transition({ opacity: 1, duration: 2000, delay: 500 }).transition({ opacity: 0, delay: 20000, duration: 2000 },  function() {
        $('.plate-sponsor-image').css('background-image', 'url(img/sponsors/' + logos[currentLogo] + ')');
        console.log(currentLogo);
        if(currentLogo < logos.length - 1)
        {
            currentLogo++;
        } else {
            currentLogo = 0;
        }
        renderLogos();
    });
}
