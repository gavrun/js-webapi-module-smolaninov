(function () {
    "use strict";

    // single click 
    $('#button_1').on('click', function () {
        $('#block_1').css({
            color: 'green',
            'font-size': '24px'
        });
    });

    // hover over and hover away 
    $('#link_1').hover(
        function () { // mouseenter
            $(this).css('color', 'orange');
        },
        function () { // mouseleave
            $(this).css('color', '');
        }
    );

    // mark text 
    $('#select_text').on('select', function () {
        $(this).css({
            color: 'red',
            'font-size': '18px'
        });
    });

    // double click
    $('#button_2').on('dblclick', function () {
        $('#block_2').css({
            'font-family': 'Verdana, sans-serif',
            'font-weight': 'bold',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'black'
        });
    });
})();
