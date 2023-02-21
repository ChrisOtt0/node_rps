import * as fs from 'fs';

class Logger {
    init: boolean = false;
    path: string;

    constructor(path: string) {
        this.path = path;

        if (!fs.existsSync(this.path)) {
            try {
                fs.mkdirSync(this.path);
                this.init = true;
            }
            catch (e) {
                console.error(e);
            }
        } else {
            this.init = true;
        }
    }

    public log(playerID: string, msg: string, date: string): void {
        if (!this.init) {
            return;
        }

        const file: string = this.path + '/' + playerID + '.txt';
        const toWrite: string = date + ':\n' + msg + '\n\n';

        try {
            if (!fs.existsSync(file)) {
                fs.writeFileSync(file, toWrite);
            } else {
                fs.appendFileSync(file, toWrite)
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}

export {Logger}