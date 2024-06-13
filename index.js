$(document).ready(function () {
    // You need to add flexible__container class to parent class
    console.log("Text shortener!");
    let elements = ['.car-title__full-maker', '.car-title__full-name', '.car_card_option'];
    $('.flexible__container').css({
        'width': '100%',
        'height': '100%',
        'display': 'flex',
        'gap': '5px',
        'align-items': 'center'
    });

    elements.forEach(function (element) {
        $(element).css({
            'white-space': 'nowrap',
            'overflow': 'hidden',
            'text-overflow': 'ellipsis',
            'max-width': '100%'
        });
    });

    let prevWidth = $(window).width();
    let fullTexts = {};

    elements.forEach(function (elementClass, index) {
        let $elements = $(elementClass);
        $elements.each(function (index) {
            let $element = $(this);
            fullTexts[elementClass + index] = $element.text();
        });

        function truncateText() {
            $elements.each(function () {
                let $element = $(this);
                let maxWidth = $element.parent().width() + 70;
                let text = $element.text();
                let maxLength = text.length;
                let $clone = $element.clone().css({
                    "position": "absolute",
                    "left": "-9999px",
                    "top": "-9999px",
                    "width": "auto",
                    "white-space": "nowrap"
                }).appendTo("body");

                while ($clone.width() > maxWidth) {
                    maxLength--;
                    text = text.substring(0, maxLength);
                    $clone.text(text);
                }

                $clone.remove();
                if (text !== $element.text()) {
                    $element.text(text + '...');
                }
            });
        }

        truncateText();

        $(window).on('resize', function () {
            let currentWidth = $(window).width();
            if (currentWidth > prevWidth) {
                prevWidth = currentWidth;
                truncateText();

                $elements.each(function (index) {
                    let $element = $(this);
                    $element.text(fullTexts[elementClass + index]);
                });
            } else if (currentWidth < prevWidth) {
                prevWidth = currentWidth;
                truncateText();
            }
        });
    });
});