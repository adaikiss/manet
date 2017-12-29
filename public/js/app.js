
(function () {
    "use strict";

    var MANET_OPTIONS = [
        'url', 'agent', 'delay', 'format',
        'width', 'height', 'paperFormat', 'paperOrientation', 'zoom', 'quality',
        'js', 'images',
        'user', 'password',
        'callback', 'headers', 'clipRect',
        'force', 'selector','selectorCrop','selectorCropPadding',
        'engine'
    ];

    function cleanBoolValue(name, value) {
        return ((value && (name === 'js' || name === 'images')) ||
                (!value && (name === 'force' || name === 'selectorCrop'))) ? null : value;
    }

    function readOptions() {
        var options = {};
        MANET_OPTIONS.forEach(function(opt) {
            var element = $('#' + opt),
                value = element.val();

            if (typeof(value) !== 'undefined') {
                if (element.attr('type') === 'checkbox') {
                    value = cleanBoolValue(opt, element.attr('checked'));
                }

                if (value !== null && value !== '') {
                    options[opt] = value;
                }
            }
        });
        return options;
    }

    function generateUrl() {
        return '?' + $.param(readOptions());
    }

    function updateAddress() {
        $('#address').val(generateUrl());
    }

    $(document).ready(function () {
        MANET_OPTIONS.forEach(function(opt) {
            var element = $('#' + opt);

            element.keyup(updateAddress);
            element.change(updateAddress);
            if (element.attr('type') === 'select') {
                element.select(updateAddress);
            }
        });

        $('#open').click(function(event) {
            event.preventDefault();
            $('form').submit();
            // window.location = generateUrl();
        });
        const iframe = $('#contentEditableFrame');
        $('#frameToggleBtn').click(function(){
            if($('#contentEditableFrame').is('.expand')) {
                let iframeDocument = iframe[0].contentDocument || iframe[0].contentWindow.document;
                window.frames[0].realImages();
                let content = iframeDocument.body.innerHTML;
                if(content.length > 0) {
                    $('#content').val(content);
                }
            } else {
                window.frames[0].clear();
            }
            $('#contentEditableFrame').toggleClass('expand');
        });

        var rememberHeight = false;
        $('#selectorCrop').change(function(){
            if ($(this).is(':checked')) {
                rememberHeight = $('#height').val();
                $('#height').val('');
            } else if(rememberHeight){
                $('#height').val(rememberHeight);
            }
            updateAddress();
        });

        updateAddress();
    });

})();
