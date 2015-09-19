
$(function(){
    var DATA_SOURCE = 'data/sdn.xml';
    var loadingIndicator = $('.loadingIndicator');
    var errorIndicator = $('.errorIndicator');

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
            var self = this;

            $(data).find('sdnEntry').each(function(){
                var sdnEntry = $(this);
                var uid = sdnEntry.find('uid').text();
                var country = sdnEntry.find('country').first().text();

                parsed.push({
                    uid: uid,
                    country: country
                });

                if (self.countryHash[country]){
                    self.countryHash[country] += 1;
                }
                else {
                    self.countryHash[country] = 1;
                }
            });

            return parsed;
        },

        getPieData: function() {
            var countries = _.keys(this.countryHash);
            var results = [];

            for (var i=0; i<countries.length; i++){
                var country = countries[i];

                if (country) {
                    results.push({
                        'label': country,
                        'value': this.countryHash[country]
                    });
                }
            }
            return results;
        }
    });

    var countryDataCollection = new SDNData();

    countryDataCollection.fetch({
        success: function(){
            var pie = new d3pie("sdnchart", {
                "data": {
                    "smallSegmentGrouping": {
                        "enabled": true,
                        "value": 2
                    },
                    "content": countryDataCollection.getPieData()
                }
            });

            loadingIndicator.hide();

        },
        error: function(){
            errorIndicator.show();
        }
    });

});
