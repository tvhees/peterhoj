/* eslint-env node */
/* global $ */

$(document).ready(function() {
    (function circles () {
        var that = this;
        that.elements = [];
        that.folderstring = '["cycling","family","leadership","science","wine"]';
        that.folders = eval(that.folderstring);
        that.imagestring = '[["68a.jpg","fat-boys-seated.jpg","Other 2006 009.jpg","peter-bike.jpg","peter-mengler.jpg","peter-road-sign.jpg"],["Christmas_2016_1.jpg","easter-2017.jpg","family-trekking.jpg","peter-bodil.jpg","peter-mandy-0.jpg","peter-mandy-1.jpg","peter-robyn-marriage.jpg","peter-torbjorn.jpg","RWS_Sig_0009.jpg","RWS_Sig_0010.jpg","RWS_Sig_0012.jpg","RWS_Sig_0013.jpg","RWS_Sig_0014.jpg","stine-graduation.jpg"],["dad-monash.jpg","peter-cover-worlded.jpg","peter-obama.jpg","peter-unisa.jpg","turnbull-modhi-2017.jpg"],["gel-electrophoresis.png","peter-birger-lab.jpg","peter-birger-outside.jpg","peter-lab.jpg","peter-latrobe.png","peter-nick-0.jpg","peter-nickh-1.jpg","peter-trevor.jpg"],["peter-vineyard.jpg","peter-wineglass.jpg"]]';
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