(function () {
    "use strict";

    let worker = null;

    const scriptInpt = document.getElementById("scriptInpt");
    const runBtn = document.getElementById("runBtn");
    const stopBtn = document.getElementById("stopBtn");
    const uiBtn = document.getElementById("uiBtn");
    const uiCounter = document.getElementById("uiCounter");
    const statusEl = document.getElementById("status");
    const outputEl = document.getElementById("output");

    if (typeof Worker === "undefined") {
        statusEl.textContent = "Browser does not support Web Workers";
        runBtn.disabled = true;
        stopBtn.disabled = true;
        return;
    }

    runBtn.addEventListener("click", startWorker);
    stopBtn.addEventListener("click", stopWorker);

    uiBtn.addEventListener("click", () => {
        const current = Number(uiCounter.textContent) || 0;
        uiCounter.textContent = current + 1;
    });

    function startWorker() {
        const code = scriptInpt.value.trim();
        if (!code) {
            statusEl.textContent = "Please enter some JavaScript code first";
            return;
        }

        // Stop previous worker if it exists
        if (worker) {
            worker.terminate();
            worker = null;
        }

        outputEl.textContent = "";
        statusEl.textContent = "Worker is running...";
        statusEl.classList.add("working");
        stopBtn.disabled = false;

        worker = new Worker("worker.js");

        worker.onmessage = function (event) {
            const data = event.data || {};
            switch (data.type) {
                case "log":
                    appendLine("[log] " + data.message);
                    break;
                case "result":
                    appendLine("[result] " + String(data.result));
                    break;
                case "error":
                    appendLine("[error] " + data.message);
                    statusEl.textContent = "Worker error";
                    finishWorker();
                    break;
                case "done":
                    statusEl.textContent = "Worker finished";
                    finishWorker();
                    break;
                default:
                    appendLine(String(data));
                    break;
            }
        };

        worker.onerror = function (error) {
            appendLine("[error] " + error.message);
            statusEl.textContent = "Worker error";
            finishWorker();
        };

        worker.postMessage({
            type: "run",
            code: code
        });
    }

    function stopWorker() {
        if (!worker) {
            return;
        }
        worker.terminate();
        worker = null;
        statusEl.textContent = "Worker stopped";
        finishWorker();
    }

    function finishWorker() {
        statusEl.classList.remove("working");
        stopBtn.disabled = true;
        worker = null;
    }

    function appendLine(text) {
        outputEl.textContent += text + "\n";
        outputEl.scrollTop = outputEl.scrollHeight;
    }
})();
