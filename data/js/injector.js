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
        getDepURI: function(relative) {
            var prefix = relative.substring(0, 'http'.length);

            return prefix == 'http' || prefix == 'file'
                ? relative
                : chrome.extension.getURL(relative);
        },
        getDeps: function() {
            return {
                js: [
                    'data/js/content-script.js'
                ],
                css: [
                    'data/css/style.css',
                    'data/css/fonts/roboto.css',
                    'data/css/fonts/materialdesignicons.css'
                ]
            };
        },
        injectScript: function(src, target) {
            var s = target.createElement('script');
            s.src = src;
            (target.head || target.documentElement).appendChild(s);
        },
        injectStylesheet: function(src, target) {
            var s = target.createElement('link');
            s.rel = 'stylesheet';
            s.href = src;
            s.media = 'all';
            s.type = 'text/css';
            target.head.appendChild(s);
        },
        injectAll: function(target) {
            if (target == undefined) {
                console.error('Could not inject dependencies into target.');
                return;
            }

            var deps = this.getDeps();
            var that = this;

            // Inject scripts
            deps.js.forEach(function(uri) {
                that.injectScript(that.getDepURI(uri), target);
            });

            // Inject stylesheets
            deps.css.forEach(function(uri) {
                that.injectStylesheet(that.getDepURI(uri), target);
            });
        }
    };

    // Check if Material-Netgear-Genie meta tag is here
    // (it would mean that another instance has already been injected)
    if (Injector.hasMeta(Injector.metaName))
        throw new Error('Material-Netgear-Genie already injected, aborting.');

    // Append Material-Netgear-Genie meta tag to head
    Injector.addMeta(Injector.metaName, true);

    Injector.injectAll(document);
})();
