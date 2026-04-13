export default function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        const referer = req.headers['referer'] || '';
        const origin = req.headers['origin'] || '';
        const secFetchSite = req.headers['sec-fetch-site'] || '';
        const secFetchMode = req.headers['sec-fetch-mode'] || '';
        const secFetchDest = req.headers['sec-fetch-dest'] || '';
        const accept = req.headers['accept'] || '';
        const acceptLanguage = req.headers['accept-language'] || '';
        const acceptEncoding = req.headers['accept-encoding'] || '';
        const connection = req.headers['connection'] || '';
        const cacheControl = req.headers['cache-control'] || '';
        const pragma = req.headers['pragma'] || '';
        const upgradeInsecureRequests = req.headers['upgrade-insecure-requests'] || '';
        const secChUa = req.headers['sec-ch-ua'] || '';
        const secChUaMobile = req.headers['sec-ch-ua-mobile'] || '';
        const secChUaPlatform = req.headers['sec-ch-ua-platform'] || '';
        
        if (hosted !== "mainloader") {
            return res.status(403).send("nice try better luck next time");
        }
        
        const browserHeaders = acceptLanguage || acceptEncoding || upgradeInsecureRequests || secChUa || secChUaMobile || secChUaPlatform || cacheControl || pragma || connection === "keep-alive";
        
        const fetchHeaders = secFetchSite || secFetchMode || secFetchDest || referer || origin;
        
        const browserAccept = accept.includes("text/html") || accept.includes("application/json") || accept.includes("image/webp") || accept.includes("*/*");
        
        if (fetchHeaders || browserHeaders || browserAccept) {
            return res.status(403).send("nice try better luck next time");
        }

        const luaScriptContent = `loadstring(game:HttpGet("https://raw.githubusercontent.com/Fsploit/Akak/main/api/loader.txt"))()`; 

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
