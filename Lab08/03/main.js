(function () {
    "use strict";

    // show and hide
    $('#button_1').on('click', function () {
        $('#block_1').hide();
    });

    $('#button_2').on('click', function () {
        $('#block_1').show();
    });

    // fade transparency
    $('#block_2').hover(
        function () {
            $(this).fadeTo(1000, 0.1);
        },
        function () {
            $(this).fadeTo(1000, 1);
        }
    );

    // hight animation
    $('#button_3').on('click', function () {
        $('#block_3').animate({ height: '20px' }, 1000);
    });

    $('#button_4').on('click', function () {
        $('#block_3').animate({ height: '100px' }, 1000);
    });

    // red rectangle
    $('#button_5').on('click', function () {
        let w = $(window).width() - 50;
        let h = $(window).height() - 50;

        $('#box')
            .animate({ left: w, top: 0 }, 1000)
            .animate({ left: w, top: h }, 1000)
            .animate({ left: 0, top: h }, 1000)
            .animate({ left: 0, top: 0 }, 1000);
    });
})();
