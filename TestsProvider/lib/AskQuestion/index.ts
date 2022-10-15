import readline from 'readline';

export function AskQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(`${query}\n`, ans => {
        rl.close();
        resolve(ans);
    }))
}
