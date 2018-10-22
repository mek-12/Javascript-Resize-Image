$(document).ready(function () {

    $.imageProfile = $('#destinationImageId'); //get image element with jquery


    $('#myinput').click(function () { //input element for image : input type "image/*". Run input with event mouse click

        $.input = $('<input/>')
            .attr('type', 'file')
            .attr('name', 'file')
            .attr('accept', 'image/*')
            .attr('id', 'uploadimage');
        $.input.click();
        $.input.change(function () {

            var file = $.input[0].files[0];

            var reader = new FileReader(); // input reading by FileReader

            reader.onload = function (e) {
                var data = e.target.result;
                var i = new Image();
                i.onload = function () {
                    $.resizeURL = DrawImageCnvs(i);
                    $('#destinationImageId').removeAttr('src');
                    $('#destinationImageId').attr('src', $.resizeURL);
                };
                i.src = data;
            };

            reader.readAsDataURL(file);
        });
    });


});

function DrawImageCnvs(e) {
    $.width = e.width;
    $.height = e.height;

    $.sX = 0; //source image x coordinate
    $.sY = 0; //source y coordinate
    $.sWidth = 0; // source width
    $.sHeight = 0; //source height
    $.dX = 0;   // Destination x coordinate for Canvas
    $.dY = 0;   // Destination y coordinate for Canvas
    $.dWidth = 120; // Destination width for Canvas
    $.dHeight = 120; // Destination height for Canvas
    var cnvs = document.createElement('canvas');
    cnvs.width = 120;
    cnvs.height = 120;
    var ctx = cnvs.getContext('2d');

    if ($.width > $.height) {           //image scroll center start
        $.sX = ($.width - $.height) / 2;
        $.sWidth = $.height;
        $.sHeight = $.height;
    }
    else if ($.height > $.width) {
        $.sY = ($.height - $.width) / 2;
        $.height = $.width;
        $.sWidth = $.width;
        $.sHeight = $.width;
    }
    else if ($.height === $.width) {
        $.sWidth = $.width;
        $.sHeight = $.height;          //image scroll center end
    }
    ctx.drawImage(e, $.sX, $.sY, $.sWidth, $.sHeight, $.dX, $.dY, $.dWidth, $.dHeight); // new image drawe with in canvas

    $.dataUrl = cnvs.toDataURL('image/png');       // image convert to base64 and png format
    return $.dataUrl;                              // return new image base64 
}