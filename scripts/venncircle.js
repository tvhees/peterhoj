/* eslint-env node */
/* global $ */

$(document).ready(function() {
    (function circles () {
        var that = this;
        that.elements = [];
        that.folderstring = '@@folders';
        that.folders = eval(that.folderstring);
        that.imagestring = '@@images';
        that.images = eval(that.imagestring);

        function CreateCircle (item, properties) {
            var circle = this;
            circle.index = 0;
            circle.item = item;
            circle.folder = properties.folder;
            circle.images = properties.images;

            circle.NextImage = function () {
                circle.index++;
                if(circle.index >= circle.images.length) {
                    circle.index = 0;
                }

                circle.item.attr('src', 'img/' + circle.folder + '/' + circle.images[circle.index]);
            };
        }

        function ChangeImages () {
            that.elements.forEach(function(element) {
                element.NextImage();
            });
        }

        $('.venn-image').each(function (index) {
            that.elements.push(new CreateCircle($(this), {
                folder: that.folders[index],
                images: that.images[index]
            }));
        });

        ChangeImages();

        setInterval(ChangeImages, 2000);
    }());
});