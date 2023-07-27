import * as fs from "fs";

export default class FileRepository{
    static write(data: any){
        fs.appendFile("db.txt", JSON.stringify(data).toString() + ",", err => {
            if(err) console.log(err)
        })
    }
}