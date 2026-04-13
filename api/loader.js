export default function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        const robloxId = req.headers['roblox-id'] || '';
        
        const isExecutor = userAgent.includes("Roblox") || robloxId || userAgent.toLowerCase().includes('roblox');
        
        if (hosted !== "mainloader") {
            return res.status(403).send("malformed link or file api changed error 200");
        }
        
        if (!isExecutor) {
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
