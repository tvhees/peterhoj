/* eslint-env node */
/* global $ */

$(document).ready(function() {
    (function circles () {
        var that = this;
        that.elements = [];
        that.folderstring = '["family","leadership","science","sports","wine"]';
        that.folders = eval(that.folderstring);
        that.imagestring = '[["easter-2017.jpg","family-trekking.jpg","peter-bodil.jpg","peter-mandy-0.jpg","peter-mandy-1.jpg","peter-torbjorn.jpg"],["peter-unisa.jpg","turnbull-modhi-2017.jpg"],["gel-electrophoresis.png","peter-latrobe.png","peter-nick-0.jpg","peter-nickh-1.jpg","peter-trevor.jpg"],["peter-bike.jpg","peter-road-sign.jpg"],["peter-vineyard.jpg","peter-wineglass.jpg"]]';
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