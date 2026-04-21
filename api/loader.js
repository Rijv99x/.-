export async function onRequest(context) {
    try {
        const { request } = context;
        const headers = request.headers;
        
        const accept = headers.get('accept') || '';
        const userAgent = headers.get('user-agent') || '';
        const secFetchSite = headers.get('sec-fetch-site') || '';
        const secFetchMode = headers.get('sec-fetch-mode') || '';
        const secFetchDest = headers.get('sec-fetch-dest') || '';
        const referer = headers.get('referer') || '';
        const origin = headers.get('origin') || '';
        const xRequestedWith = headers.get('x-requested-with') || '';
        
        if (secFetchSite || secFetchMode || secFetchDest) {
            return new Response("Access denied", { status: 403 });
        }
        
        if (referer || origin) {
            return new Response("Access denied", { status: 403 });
        }
        
        if (xRequestedWith.toLowerCase() === "xmlhttprequest") {
            return new Response("Access denied", { status: 403 });
        }
        
        if (accept.includes("text/html") || accept.includes("application/json") || accept === "*/*") {
            return new Response("Access denied", { status: 403 });
        }
        
        if (!userAgent.includes("Roblox")) {
            return new Response("Access denied", { status: 403 });
        }

        const luaScriptContent = `loadstring(game:HttpGet("https://rawscripts.net/raw/2x-Luck-Sailor-Piece-Auto-farm-Auto-duegon-Auto-boss-BEST-script-201573"))()`;
        
        return new Response(luaScriptContent, {
            status: 200,
            headers: { "Content-Type": "text/plain" }
        });
        
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
