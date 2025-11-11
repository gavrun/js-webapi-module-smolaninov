(function () {
    const logElement = document.getElementById('log');
    const log = (msg) => {
        if (logElement) {
            logElement.textContent += `\n${msg}`;
        }
    };

    if (!window.applicationCache) {
        log('Browser does not support AppCache');
        return;
    }

    const appCache = window.applicationCache;

    // cache lifecycle events
    appCache.addEventListener('checking', () => log('checking...'), false);

    appCache.addEventListener('downloading', () => log('downloading...'), false);

    appCache.addEventListener('progress', (e) => log(`progress: ${e.loaded || '?'} of ${e.total || '?'}`), false);

    appCache.addEventListener('cached', () => log('cached: done, offline enabled'), false);

    appCache.addEventListener('noupdate', () => log('noupdate: no changes'), false);

    appCache.addEventListener('updateready', () => {
        log('updateready: found new version, applying...');
        try {
            appCache.swapCache();
        }
        catch { }
        // reload to update
        location.reload();
    }, false);

    appCache.addEventListener('obsolete', () => log('obsolete: manifest/cache marked as old'), false);

    appCache.addEventListener('error', () => log('error: something went wrong'), false);

    // check updates
    const btn = document.getElementById('check');
    if (btn) btn.addEventListener('click', () => {
        log('Updating manifest...');
        try {
            appCache.update();

        }
        catch (e) {
            log('update(): error');
        }
    });
})();
