export default function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        const isRoblox = userAgent.includes("Roblox") || req.headers['roblox-id'];
        const isFetch = req.headers['origin'] || req.headers['referer'] || req.headers['sec-fetch-site'];

        if (!isRoblox) {
            return res.redirect('/');
        }

        if (hosted !== "xyz.loader") {
            return res.status(403).send("kynx.net");
        }

        if (isFetch) {
            res.setHeader("Content-Type", "text/plain");
            return res.status(200).send(`print("kynx.net")`);
        }

        const luaScriptContent = `loadstring(game:HttpGet("https://raw.githubusercontent.com/Fsploit/Akak/main/api/loader.txt"))()`;
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        const finalScript = `print("nice try better luck next time")\n` + luaScriptContent;

        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}
