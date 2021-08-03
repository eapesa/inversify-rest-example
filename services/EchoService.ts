export class EchoService {
    constructor() {}
    public async echoName(name: string) {
        let greeting = `Hey there, ${name}! How are you?`;
        console.log(greeting);
        return {
            "hello": greeting
        };
    }
}