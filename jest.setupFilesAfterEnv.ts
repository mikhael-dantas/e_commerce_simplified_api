import 'reflect-metadata';
import http from 'http';

class ApiRequest {
    public static async post(query: string, options?: http.RequestOptions) {
        const myOptions: http.RequestOptions = options || {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            host: process.env.SERVER_HOST || 'localhost',
            port: process.env.SERVER_PORT || 4000,
            path: '/graphql',
        }

        return new Promise((resolve, reject) => {
            const req = http.request(myOptions, res => {
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            });
            req.on('error', error => {
                reject(error);
            });
            req.write(query);
            req.end();
        })
    }
}

Object.assign(global, {
    api__: ApiRequest
});