import { createClient } from "redis";

class DbSingleton {
    private static instance: DbSingleton = null;
    private client: any;

    private constructor() {
        this.client = createClient();
    }

    public static getInstance(): DbSingleton {
        if (this.instance === null) {
            this.instance = new DbSingleton();
        }

        return this.instance;
    }

    public async initializeAsync() {
        await this.client.connect();
    }

    public async getAsync(key: any) {
        return await this.client.get(key);
    }

    public async setAsync(key: any, value: any) {
        return await this.client.set(key, value);
    }
}