export default function handler(req, res) {
    const startTime = performance.now();

    try {
        const hosted = req.query.hosted;
        const userAgent = req.headers['user-agent'] || '';
        const isRoblox = userAgent.toLowerCase().includes("roblox");

        if (!isRoblox) {
            return res.redirect('/');
        }

        if (hosted !== "mainloader") {
            return res.status(403).send("kynx.net");
        }

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        const finalScript = `
warn("kynx: ${timeTaken}ms")
local res = (http_request or request or syn.request)({
    Url = "https://vss.pandadevelopment.net/virtual/file/ea3100c66b9c4da3",
    Method = "GET",
    Headers = { ["x-kynx-key"] = "rj2014" }
})
loadstring(res.Body)()
`;

        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(finalScript);

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}
