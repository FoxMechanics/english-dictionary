var dictionary = {
    dicts: {},
    load: function (track, callback) {
        if (typeof dictionary.dicts[track] != 'undefined') {
            callback(dictionary.dicts[track]);
        } else {
            var file = 'files/'+track+'.json';

            $.getJSON(file, function(data){
                dictionary.dicts[track] = data;
                callback(dictionary.dicts[track]);
            });
        }
        
    },
    search: function (term, callback) {
        if (term.length > 0) {

            var track = 'all';
            if (term.length > 1) {
                track = term.substring(0,2);
            }

            var words = [];

            dictionary.load(track, function(data) {
                var matchMe = new RegExp('^' + term, 'i');

                for (var i in data) {
                    if (data[i].word.search(matchMe) > -1) {

                        words.push({
                            'id': data[i].id,
                            'word': data[i].word,
                            'descr':data[i].descr,
                            'type':data[i].type
                        });

                        if (words.length == 7) {
                            break;
                        }
                    }
                }

                callback(words);
            });
        }
    }
};