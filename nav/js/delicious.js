$.ajax({
    type: "GET",
    url: "http://feeds.delicious.com/v2/json/rokni?count=5&callback=Delicious",
    jsonpCallback: "Delicious",
    dataType: "jsonp",
    success: function (data) {
        var obj = data,         // get entry object (array) from JSON data
            ul = $("<ul>"),     // create a new ul element
            aUL = [];

        $.each(obj, function(key) {
            $('<li>', {
                html: '<a href="' + obj[key].u+ '" target="_blank" class="external">' + obj[key].d + '</a><span>Tag:' + obj[key].t[0] + '</span>'
            }).appendTo(ul);
        });

        $("#delicious").append(ul);    // add the list to the DOM
    }
});