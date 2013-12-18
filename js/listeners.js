jQuery(document).ready(function ()
{

    jQuery("#volume_slider, #volume_box").change(function ()
    {
        setCurrentVolume(jQuery(this).val());
    });

});