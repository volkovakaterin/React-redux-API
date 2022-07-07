const http = require("http");
const host = 'localhost';
const port = 8000;

let store = JSON.stringify([{id: 'jij9', name: "Замена стекла", value: '21000', content: 'Стекло оригинал от Apple'}, 
    {id: 'gd9l9', name: "Замена дисплея", value: '25000', content: 'Дисплей оригинал от Apple'}, 
    {id: 'kji6', name: "Замена аккумулятора", value: '4000', content: 'Аккумулятор оригинал от Apple'}, 
    {id: 'cgy7', name: "Замена микрофона", value: '2500', content: 'Микрофон оригинал от Apple'}]);

const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, application/json, accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    let methodReq = req.method;
    switch (req.url) {
        case "/services":
            if (methodReq == "POST") {
                console.log('post');
                let data = '';
                req.on('data', function (chunk) {
                    data += chunk.toString();
                });
                req.on('end', function () {
                    let obj = JSON.parse(store);
                    obj = obj.map((srv)=>{
                        if(srv.id === JSON.parse(data).id) {
                            srv.name = JSON.parse(data).name;
                            srv.value = JSON.parse(data).value, 
                            srv.content = JSON.parse(data).content
                        } return srv
                    })
                    store = JSON.stringify(obj);
                    res.writeHead(200);
                    res.end(store);
                });
                break;
            }
            if (methodReq == "GET") {
                console.log('get');
                let obj = JSON.parse(store);
                obj = obj.map(svr=>{
                    delete svr.content
                    return svr
                })
                res.writeHead(200);
                res.end(JSON.stringify(obj));
                break;
            }
            if (methodReq == "OPTIONS") {
                console.log('options');
                res.setHeader('200', 'OK');
                res.setHeader('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'API-Key, Content-Type, If-Modified-Since, Cache-Control');
                res.setHeader('Access-Control-Max-Age', '86400');
                res.writeHead(200);
                res.end();
                break
            }
            if (methodReq == "DELETE") {
                console.log('delete');
                let data = '';
                req.on('data', function (chunk) {
                    data += chunk.toString();
                });
                req.on('end', function () {
                    let obj = JSON.parse(store);
                    obj = obj.filter(item => item.id != JSON.parse(data));
                    store = JSON.stringify(obj);
                    res.writeHead(200);
                    res.end(store);
                });
                break;
            }
        // case 'http://localhost:8000/serviced/:jij9':
        //     if (methodReq == "DELETE") {
        //         console.log('delete');
        //         // let data = '';
        //         // req.on('data', function (chunk) {
        //         //     data += chunk.toString();
        //         // });
        //         req.on('end', function () {
        //             let obj = JSON.parse(store);
        //             obj = obj.filter(item => item.id != 'jij9');
        //             store = JSON.stringify(obj);
        //             res.writeHead(200);
        //             res.end(store);
        //         });
        //         break;
        //     } 
        // case 'http://localhost:8000/serviced/:gd9l9':
        //     if (methodReq == "DELETE") {
        //         console.log('delete');
        //         req.on('end', function () {
        //             let obj = JSON.parse(store);
        //             obj = obj.filter(item => item.id != 'gd9l9');
        //             store = JSON.stringify(obj);
        //             res.writeHead(200);
        //             res.end(store);
        //         });
        //         break;
        //     } 
        // case 'http://localhost:8000/serviced/:kji6':
        //     if (methodReq == "DELETE") {
        //         console.log('delete');
        //         req.on('end', function () {
        //             let obj = JSON.parse(store);
        //             obj = obj.filter(item => item.id != 'kji6');
        //             store = JSON.stringify(obj);
        //             res.writeHead(200);
        //             res.end(store);
        //         });
        //         break;
        //     } 
        // case 'http://localhost:8000/serviced/:cgy7':
        //     if (methodReq == "DELETE") {
        //         console.log('delete');
        //         req.on('end', function () {
        //             let obj = JSON.parse(store);
        //             obj = obj.filter(item => item.id != 'cgy7');
        //             store = JSON.stringify(obj);
        //             res.writeHead(200);
        //             res.end(store);
        //         });
        //         break;
        //     }    
        case `/services/:jij9`: 
            if (methodReq == "GET") {
            console.log('get');
            let obj = JSON.parse(store);
            obj = obj.find(item => item.id === 'jij9');
            res.writeHead(200);
            res.end(JSON.stringify(obj));
            break;
            }
        case `/services/:gd9l9`: 
        if (methodReq == "GET") {
            console.log('get');
            let obj = JSON.parse(store);
            obj = obj.find(item => item.id === "gd9l9");
            res.writeHead(200);
            res.end(JSON.stringify(obj));
            break;
            }
        case `/services/:kji6`: 
        if (methodReq == "GET") {
            console.log('get');
            let obj = JSON.parse(store);
            obj = obj.find(item => item.id === 'kji6');
            res.writeHead(200);
            res.end(JSON.stringify(obj));
            break;
            }  
        case `/services/:cgy7`: 
        if (methodReq == "GET") {
            console.log('get');
            let obj = JSON.parse(store);
            obj = obj.find(item => item.id === 'cgy7');
            res.writeHead(200);
            res.end(JSON.stringify(obj));
            break;
            } 
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}/services`);
});
