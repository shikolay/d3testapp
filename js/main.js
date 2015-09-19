var pie = new d3pie("sdnchart", {
    "data": {
            "content": [
                {
                    "label": "Scheme",
                    "value": 67706
                },
                {
                    "label": "Rust",
                    "value": 36344
                },
                {
                    "label": "FoxPro",
                    "value": 32170
                }
            ]
    }
});


$(function(){
    var DATA_SOURCE = 'data/sdn.xml';

    var SDNData = Backbone.Collection.extend({
        url: DATA_SOURCE,
        countryHash: {},

        fetch: function(options) {
            options || (options = {});
            options.dataType = 'xml'; // We're expecting XML from the server.
            Backbone.Collection.prototype.fetch.call(this, options);
        },
        parse: function(data) {
            var parsed = [];
            
            $(data).find('sdnEntry').each(function(){
                var sdnEntry = $(this);
                var uid = sdnEntry.find('uid').text();
                var country = sdnEntry.find('country').text();

                parsed.push({
                    uid: uid,
                    country: country
                });
            });

            console.log(parsed.length);
            return parsed;
        }
    });

    var SDNCollection = new SDNData();
    SDNCollection.fetch({
        success: function(){
            debugger;
        },
        error: function(){
            debugger;
        }
    });

});
