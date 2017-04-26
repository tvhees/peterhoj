/* eslint-env node */
/* global $ */

$(document).ready(function() {
    (function circles () {
        var that = this;
        that.elements = [];

        function CreateCircle (item) {
            var circle = this;
            circle.index = 0;
            circle.item = item;
            circle.images = [];

            circle.NextImage = function () {
                circle.index++;
                if(circle.index >= circle.images.length) {
                    circle.index = 0;
                }
            };
        }

        function ChangeImages () {
            that.elements.forEach(function(element) {
                element.NextImage();
            });
        }

        $('.venn-image').each(function (index, element) {
            that.elements.push(new CreateCircle(element));
        })

        ChangeImages();
    }());
});