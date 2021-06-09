$(document).ready(function() {
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-90
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });

    $("#name").on("click", function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            'scrollTop': 0
        }, 900, 'swing', function () {
            window.location.hash = 0;
        });
    });

	$.stellar();
});
