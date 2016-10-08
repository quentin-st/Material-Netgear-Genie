/**
 * Material-Netgear-Genie
 * Client dependencies injector
 */
(function() {
    // Define functions
    var Injector = {
        metaName: 'MaterialNetgearGenie',
        hasMeta: function(key) {
            var metas = document.getElementsByTagName('meta');
            for (var i = 0; i < metas.length; i++) {
                if (metas[i].name == key)
                    return true;
            }

            return false;
        },
        addMeta: function(key, val) {
            var m = document.createElement('meta');
            m.name = key;
            m.content = val;
            document.head.appendChild(m);
            return m;
        },
        getDeps: function() {
            return {
                js: [
                    'data/js/material-netgear-genie.js',
                    'data/js/content-script.js'
                ],
                css: [
                    'data/css/style.css',
                    'data/css/fonts/roboto.css',
                    'data/css/fonts/materialdesignicons.css'
                ]
            };
        },
        injectScript: function(src) {
            var s = document.createElement('script');
            s.src = src;
            (document.head || document.documentElement).appendChild(s);
        },
        injectStylesheet: function(src) {
            var s = document.createElement('link');
            s.rel = 'stylesheet';
            s.href = src;
            s.media = 'all';
            s.type = 'text/css';
            document.head.appendChild(s);
        },
        injectAll: function() {
            var deps = this.getDeps();
            var that = this;

            // Inject scripts
            deps.js.forEach(function(uri) {
                that.injectScript(MaterialNetgearGenie.getDepURI(uri));
            });

            // Inject stylesheets
            deps.css.forEach(function(uri) {
                that.injectStylesheet(MaterialNetgearGenie.getDepURI(uri));
            });
        }
    };

    // Check if Material-Netgear-Genie meta tag is here
    // (it would mean that another instance has already been injected)
    if (Injector.hasMeta(Injector.metaName))
        throw new Error('Material-Netgear-Genie already injected, aborting.');

    // Append Material-Netgear-Genie meta tag to head
    Injector.addMeta(Injector.metaName, true);

    // Inject dependencies
    Injector.injectAll();
})();
