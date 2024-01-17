$('#toggle-left-menu').click(function() {
    if ($('#left-menu').hasClass('small-left-menu')) {
        $('#left-menu').removeClass('small-left-menu');
    } else {
        $('#left-menu').addClass('small-left-menu');
    }
    $('#logo').toggleClass('small-left-menu');
    $('#page-container').toggleClass('small-left-menu');
    $('#header .header-left').toggleClass('small-left-menu');

    $('#logo .big-logo').toggle('300');
    $('#logo .small-logo').toggle('300');
    $('#logo').toggleClass('p-0 pl-1');
});

$(document).on('mouseover', '#left-menu.small-left-menu > ul > li', function() {
    if (!$(this).hasClass('has-sub')) {
        var label = $(this).find('span').text();
        var position = $(this).position();
        $('#show-lable').css({
            'top': position.top + 79,
            'left': position.left + 59,
            'opacity': 1,
            'visibility': 'visible'
        });

        $('#show-lable').text(label);
    } else {
        var position = $(this).position();
        $(this).find('ul').addClass('open');

        if ($(this).find('ul').hasClass('open')) {
            const height = 47;
            var count_submenu_li = $(this).find('ul > li').length;
            if (position.top >= 580) {
                var style = {
                    'top': (position.top + 100) - (height * count_submenu_li),
                    'height': height * count_submenu_li + 'px'
                }
                $(this).find('ul.open').css(style);
            } else {
                var style = {
                    'top': position.top + 79,
                    'height': height * count_submenu_li + 'px'
                }

                $(this).find('ul.open').css(style);
            }

        }
    }

});

$(document).on('mouseout', '#left-menu.small-left-menu li a', function(e) {
    $('#show-lable').css({
        'opacity': 0,
        'visibility': 'hidden'
    });
});

$(document).on('mouseout', '#left-menu.small-left-menu li.has-sub', function(e) {
    $(this).find('ul').css({
        'height': 0,
    });
});

$(window).resize(function() {
    windowResize();
});

$(window).on('load', function() {
    windowResize();
});

$('#left-menu li.has-sub > a').click(function() {
    var _this = $(this).parent();

    _this.find('ul').toggleClass('open');
    $(this).closest('li').toggleClass('rotate');

    _this.closest('#left-menu').find('.open').not(_this.find('ul')).removeClass('open');
    _this.closest('#left-menu').find('.rotate').not($(this).closest('li')).removeClass('rotate');
    _this.closest('#left-menu').find('ul').css('height', 0);

    if (_this.find('ul').hasClass('open')) {
        const height = 47;
        var count_submenu_li = _this.find('ul > li').length;
        _this.find('ul').css('height', height * count_submenu_li + 'px');
    }
});


function windowResize() {
    var width = $(window).width();
    if (width <= 992) {
        $('#left-menu').addClass('small-left-menu');
        $('#logo').addClass('small-left-menu p-0 pl-1');
    } else {
        $('#left-menu').removeClass('small-left-menu');
        $('#logo').removeClass('small-left-menu p-0 pl-1');
    }
}