import {
    provide
} from 'inversify-binding-decorators';

@provide(EchoService)
export class EchoService {
    constructor() {}
    public greetName(name: string): object {
        return {
            "hello": `Ohayou ${name}! Ogenki desu ka? Kyou mo gambarimasu!`
        }
    }
}