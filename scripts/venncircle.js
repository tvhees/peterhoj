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
            var folder, images,
                circle = this,
                index = 0;
            folder = properties.folder;
            images = properties.images;

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
            }

            index = getRandomInt(0, images.length);

            circle.NextImage = function () {
                index++;
                if(index >= images.length) {
                    index = 0;
                }

                item.attr('src', 'img/' + folder + '/' + images[index]);
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