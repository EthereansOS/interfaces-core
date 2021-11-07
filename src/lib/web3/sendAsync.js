export default function sendAsync(provider, method) {
    var params = [...arguments].slice(2) || [];
    return new Promise(async function(ok, ko) {
        try {
            await (provider.sendAsync || provider.send).call(provider, {
                "jsonrpc": "2.0",
                method,
                params,
                id: new Date().getTime()
            }, function(error, response) {
                return error || (response && response.error) ? ko(error || (response && response.error)) : ok(response && response.result);
            });
        } catch (e) {
            return ko(e);
        }
    });
}