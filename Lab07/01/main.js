(function () {
    'use strict';

    function initApp() {
        const statusElement = document.getElementById('status');
        const cacheStatusElement = document.getElementById('cacheStatus');

        const debugElement = document.getElementById('debug');

        function debug(msg) {
            if (debugElement) {
                debugElement.textContent += msg + '\n';
            }
            console.log(msg);
        }

        debug('userAgent: ' + navigator.userAgent);
        debug('typeof window.applicationCache: ' + (typeof window.applicationCache));
        debug('applicationCache in window: ' + ('applicationCache' in window));
        debug('window.applicationCache value: ' + String(window.applicationCache));

        if (!statusElement || !cacheStatusElement) return;

        function updateStatus() {
            if (navigator.onLine) {
                statusElement.textContent = 'ONLINE';
                statusElement.className = 'status online';
            } else {
                statusElement.textContent = 'OFFLINE';
                statusElement.className = 'status offline';
            }
        }

        function setCacheStatus(text) {
            cacheStatusElement.textContent = text;
        }

        function updateCache() {
            if (window.applicationCache) {
                setCacheStatus('Checking/updating cache');
                window.applicationCache.update();
            } else {
                setCacheStatus(
                    'Browser does not support AppCache. typeof=' +
                    (typeof window.applicationCache) +
                    ', in window=' + ('applicationCache' in window)
                );
                debug('No AppCache support');
            }
        }

        window.updateCache = updateCache;

        updateStatus();
        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);

        if (window.applicationCache) {
            const appCache = window.applicationCache;

            appCache.addEventListener('checking', function () {
                setCacheStatus('Checking cache updates');
            });

            appCache.addEventListener('downloading', function () {
                setCacheStatus('Loading cache');
            });

            appCache.addEventListener('progress', function () {
                setCacheStatus('Caching resources');
            });

            appCache.addEventListener('cached', function () {
                setCacheStatus('Cached. Offline ready');
            });

            appCache.addEventListener('noupdate', function () {
                setCacheStatus('No updates');
            });

            appCache.addEventListener('updateready', function () {
                setCacheStatus('New cache version. Applying');
                appCache.swapCache();
            });

            appCache.addEventListener('error', function () {
                setCacheStatus('Error working with cache (AppCache).');
            });
        } else {
            ssetCacheStatus(
                'Browser does not support AppCache. typeof=' +
                (typeof window.applicationCache) +
                ', in window=' + ('applicationCache' in window)
            );
            debug('No AppCache support');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

})();
