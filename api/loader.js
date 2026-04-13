export default function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        const referer = req.headers['referer'] || '';
        const origin = req.headers['origin'] || '';
        const secFetchSite = req.headers['sec-fetch-site'] || '';
        const secFetchMode = req.headers['sec-fetch-mode'] || '';
        
        const isRoblox = userAgent.includes("Roblox") || req.headers['roblox-id'] || req.headers['user-agent']?.toLowerCase().includes('roblox');
        
        const isFetch = referer || origin || secFetchSite || secFetchMode === 'cors' || secFetchMode === 'no-cors';
        
        if (hosted !== "mainloader") {
            return res.status(403).send("malformed link or file api changed error 200");
        }
        
        if (isFetch && !isRoblox) {
            return res.status(403).send("nice try better luck next time");
        }

        const luaScriptContent = `loadstring(game:HttpGet("https://aikoware.pages.dev/mainloader"))()`; 

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
