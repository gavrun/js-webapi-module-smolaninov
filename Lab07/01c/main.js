// register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(() => console.log('SW registered'))
        .catch(console.error);
}

async function loadData() {
    const out = document.getElementById('output');
    out.textContent = 'Loading...';
    try {
        const demo = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const json = await demo.json();
        out.textContent = JSON.stringify(json, null, 2);
    } catch (error) {
        out.textContent = 'loaded cached data';
    }
}

document.getElementById('loadBtn').addEventListener('click', loadData);
