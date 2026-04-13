export default function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const accept = req.headers['accept'] || '';
        const secFetchSite = req.headers['sec-fetch-site'] || '';
        const secFetchMode = req.headers['sec-fetch-mode'] || '';
        const referer = req.headers['referer'] || '';
        const origin = req.headers['origin'] || '';
        
        if (hosted !== "mainloader") {
            return res.status(403).send("nice try better luck next time");
        }
        
        // Block requests that look like browsers or standard fetch()
        if (
            secFetchSite || 
            secFetchMode || 
            referer || 
            origin || 
            accept.includes("text/html") || 
            accept.includes("application/json") || 
            accept === "*/*"
        ) {
            return res.status(403).send("nice try better luck next time");
        }

        const luaScriptContent = `loadstring(game:HttpGet("https://aiikomare.pages.dev/mainloader"))()`; 

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        
        const timingWarning = `warn("script successfully loaded: ${timeTaken}ms")\n`;
        
        const finalScript = timingWarning + luaScriptContent;

        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}
