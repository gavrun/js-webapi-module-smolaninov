const logEl = document.getElementById('log');

const log = (m) => (logEl.textContent += m + '\n');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(reg => log('SW registered: ' + (reg.scope || '')))
        .catch(err => log('SW issue registering: ' + err));
} else {
    log('Browser does not support Service Worker.');
}

document.getElementById('ping').onclick = async () => {
    const t1 = performance.now();
    try {
        const res = await fetch('./style.css', { cache: 'no-store' });
        const t2 = performance.now();
        log(`Fetch style.css -> ${res.status} in ${(t2 - t1).toFixed(1)}ms`);
    } catch (e) {
        log('Fetch failed (offline)');
    }
};