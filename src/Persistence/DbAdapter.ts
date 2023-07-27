import IWriteCommand from "src/Persistence/IWriteCommand";
import FileRepository from "src/Persistence/FileRepository";

export default class DbAdapter implements IWriteCommand{
    write(data: any) {
        try{
            FileRepository.write(data)
        }
        catch(err){
            console.error(err)
        }
    }

}