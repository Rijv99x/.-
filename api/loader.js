export default function handler(req, res) {
    try {
        const hosted = req.query.hosted || "";
        const userAgent = (req.headers["user-agent"] || "").toLowerCase();
        const accept = req.headers["accept"] || "";

        if (hosted !== "xyz.loader") {
            return res.status(403).end();
        }

        if (!userAgent.includes("roblox")) {
            return res.status(403).end();
        }

        if (
            userAgent.includes("mozilla") ||
            userAgent.includes("chrome") ||
            userAgent.includes("safari") ||
            userAgent.includes("firefox") ||
            userAgent.includes("postman") ||
            userAgent.includes("curl") ||
            userAgent.includes("wget") ||
            userAgent.includes("axios") ||
            userAgent.includes("node")
        ) {
            return res.status(403).end();
        }

        if (accept && accept !== "*/*") {
            return res.status(403).end();
        }

        if (
            req.headers["sec-fetch-site"] ||
            req.headers["sec-fetch-mode"] ||
            req.headers["sec-fetch-dest"] ||
            req.headers["referer"] ||
            req.headers["origin"]
        ) {
            return res.status(403).end();
        }

        const lua = `loadstring(game:HttpGet("https://rawscripts.net/raw/2x-Luck-Sailor-Piece-Auto-farm-Auto-duegon-Auto-boss-BEST-script-201573"))()`;

        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(lua);
    } catch {
        return res.status(500).end();
    }
}
