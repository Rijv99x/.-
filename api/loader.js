export default function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const secret = req.headers['rj20el'];
        const userAgent = req.headers['user-agent'] || '';
        const referer = req.headers['referer'] || '';
        
        const isBrowser = userAgent.includes("Chrome") || userAgent.includes("Firefox") || userAgent.includes("Safari") || userAgent.includes("Edge") || referer.includes("google") || referer.includes("bing");
        
        const isExecutor = userAgent.includes("Roblox") || userAgent.includes("RBX") || userAgent === "" || req.headers['roblox-id'] || !isBrowser;

        if (hosted !== "mainloader") {
            return res.status(403).send("kynx.net");
        }

        if (secret !== "rj20el") {
            res.setHeader("Content-Type", "text/plain");
            return res.status(403).send(`print("nice try better luck next time")`);
        }

        if (!isExecutor) {
            return res.status(404).send("Not Found");
        }

        const luaScriptContent = `loadstring(game:HttpGet("https://vss.pandadevelopment.net/virtual/file/ea3100c66b9c4da3"))()`;
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        const finalScript = `warn("kynx: ${timeTaken}ms")\n` + luaScriptContent;

        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}
