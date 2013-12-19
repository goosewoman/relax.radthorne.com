jQuery(document).ready(function ()
{
    if (typeof String.prototype.startsWith != 'function') {
        // see below for better implementation!
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }
    initVolumeSaveTask();
    initSongs();

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
    );
    jQuery("#list").click(
        function ()
        {
            showOrHideListbox();
        }
    );
    $("#perma_link").on("focus click",
        function ()
        {
            this.select();
        }
    );
    jQuery("#song_select_button").click(
        function()
        {
            setSong(jQuery("#song_select").val());
        }
    );
    jQuery("#youtubeVideo_button").click(
        function()
        {
            var value = jQuery("#youtubeVideo").val();
            if(value.startsWith("http://www.youtube.com/watch"))
            {
                setSong(getURLParameter('v', value));
            }
            else
            {
                setSong(value);
            }
        }
    );
});