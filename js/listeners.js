jQuery(document).ready(function ()
{
    jQuery("#volume_slider").bind("slider:changed",
        function (event, data)
        {
            console.log(data.value);
            setCurrentVolume(data.value);
        }
    );
    jQuery("#pauseplay").click(
        function ()
        {
            pauseOrPlay();
        }
    );
    jQuery("#next").click(
        function ()
        {
            randomSong();
        }
    );
    jQuery("#info").click(
        function ()
        {
            showOrHideInfobox();
        }
    )
});