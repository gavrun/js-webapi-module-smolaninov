(function () {
    "use strict";

    $(function () {
        // #meadow >> red + 12pt
        $('#meadow').css({
            color: 'red',
            'font-size': '12pt'
        });

        // .rainbow >> red + 12pt
        $('.rainbow').css({
            color: 'red',
            'font-size': '12pt'
        });

        // #future inside #fut >> highlight with any NON-red color
        $('#fut #future').css({
            color: 'blue',
            'font-size': '12pt'
        });

        // attribute [set]
        $('[set]').css({
            color: 'red',
            'font-size': '12pt'
        });

        // attribute [last="code"]
        $('[last="code"]').css({
            color: 'red',
            'font-size': '12pt'
        });
    });
})();
