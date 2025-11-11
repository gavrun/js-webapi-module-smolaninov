self.onmessage = function (event) {
    const data = event.data || {};

    if (data.type !== "run") {
        return;
    }

    const code = data.code || "";

    try {
        self.postMessage({
            type: "log",
            message: "Starting script inside worker..."
        });

        // API that user code can use inside the worker
        let userResult;

        const workerApi = {
            log(message) {
                self.postMessage({
                    type: "log",
                    message: String(message)
                });
            },
            setResult(value) {
                userResult = value;
            }
        };

        // Wrap user code to isolate it
        const wrappedCode = `
            (function (workerApi) {
                "use strict";
                ${code}
            })(workerApi);
        `;

        // Execute user code
        const fn = new Function("workerApi", wrappedCode);
        fn(workerApi);

        self.postMessage({
            type: "result",
            result: userResult
        });

        self.postMessage({
            type: "done"
        });
    } catch (error) {
        self.postMessage({
            type: "error",
            message: error.message
        });
    }
};
