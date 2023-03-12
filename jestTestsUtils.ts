import http from 'http';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'


export async function JestApiPost(query: string, options?: http.RequestOptions, variables?: object): Promise<string> {
    const myOptions: http.RequestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        host: process.env.SERVER_HOST || 'localhost',
        port: process.env.SERVER_PORT || 4000,
        path: '/graphql',
        ...options,
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
        const body = JSON.stringify({ query, variables });
        req.write(variables ? body : query);
        req.end();
    })
}



type MockContext = {
    prisma: DeepMockProxy<PrismaClient>
}
export const CreateMockContext = (): MockContext => {
    return {
        prisma: mockDeep<PrismaClient>(),
    }
}