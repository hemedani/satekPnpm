import {createConnection} from "typeorm";
import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class UserActionLog {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    timeStamp: string;

    @Column()
    ip: string;

    @Column()
    mac: string;

    @Column()
    location: string;

    @Column()
    browser: string;

    @Column()
    currentUrl: string;

    @Column()
    role: string;

    @Column()
    phoneNumber: string;

    @Column()
    action: string;

    @Column()
    description: string;

}
// connection settings are in the "ormconfig.json" file
createConnection({
  type: "mongodb",
  host: "localhost",
  database: "test",
  logging: ["query", "error"],
  useUnifiedTopology: true,
  synchronize: true,
  entities: [UserActionLog]
}).then(async connection => {
    const userActionLog = new UserActionLog();

    await connection.mongoManager.save(userActionLog);
    console.log("Post has been saved: ", userActionLog);

    // const loadedPosts = await connection.mongoManager.find(Post);
    // console.log("Loaded posts from the database: ", loadedPosts);

}).catch(error => console.log("Error: ", error));