var logos = ['abios.png', 'dxracer.png', 'webhallen.png', 'viagame.png', 'blizzard.png', 'blizzard2.png'];
var currentLogo = 0;

$( document ).ready(function() {
    renderLogos();
});

function renderLogos()
{
    $('.plate-sponsor-image').transition({ opacity: 1, duration: 2000, delay: 500 }).transition({ opacity: 0, delay: 20000, duration: 2000 },  function() {
        $('.plate-sponsor-image').css('background-image', 'url(img/roller/' + logos[currentLogo] + ')');
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
