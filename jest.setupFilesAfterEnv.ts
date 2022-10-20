import 'reflect-metadata';
import http from 'http';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

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

const prismaClient = new PrismaClient()

type MockContext = {
    prisma: DeepMockProxy<PrismaClient>
}

const createMockContext = (): MockContext => {
    return {
        prisma: mockDeep<PrismaClient>(),
    }
}

Object.assign(global, {
    api__: ApiRequest,
    prismaClient,
    mockedPrisma: createMockContext().prisma,
});