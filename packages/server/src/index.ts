import { ApolloServer } from "apollo-server-express";
import Express from "express";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import cors from "cors";
import { createData } from "./utils/createData";
import { UserRole } from "./entity/UserToSite";

const PORT = process.env.PORT || 4000;
let deleteAndRecreateDB = false;
export let deactiveAuthentication = false
export let userRole_deactiveAuthentication: UserRole = UserRole.Normal;
let exit = false;

process.argv.map((val, index, array) => {
    //console.log(index + ': ' + val+" ********* "+array);
    if (val === "--c") {
        console.log("start server with dropping schema and re-create DB....");
        deleteAndRecreateDB = true;
    }
    else if (val === "--d") {
        console.log("start server without authentication....");
        deactiveAuthentication = true;
        userRole_deactiveAuthentication = Object.values(UserRole)[parseInt(array[index + 1])-1] as UserRole;
        console.log("start server without authentication....\n log in as "+ userRole_deactiveAuthentication);
    }
    else if (val === "--h") {
        console.log(`you can use these options to run server with different modes:\n
        --h: get help for different modes
        --c: drop schema and recreate database with generated data(testing porpuse)
        --d: deActivate authentication for testing queries easily
        \t1:=====> Master
        \t2:=====> Admin
        \t3:=====> DiagnosisPosition
        \t4:=====> OrganizationHead
        \t5:=====> FinanceHead
        \t6:=====> FinanceEmployee
        \t7:=====> Expert
        \t8:=====> UnitHead
        \t9:=====> UnitEmployee
        \t10:====> UniversityHead
        \t11:====> StoreHead
        \t12:====> Normal
        \t13:====> Supplier
        \t14:====> Stockclerk
        \t15:====> Accountant
        \t16:====> Minister
        \n`);
        console.log(`usage: "yarn start --d [1]" to login without authentication as [Master]\n\n`)
        exit = true;
    }
});
async function bootstrap() {
    const conn = await createTypeormConnection(deleteAndRecreateDB);
    await conn.runMigrations();
    if (deleteAndRecreateDB) {
        await createData();
    }

    // ... Building schema here
    const schema = await buildSchema({
        resolvers: [__dirname + "/modules/**/*.resolver.ts"]
        // resolvers: [RegisterResolver, MeResolver],
        // authChecker: customAuthChecker
    });

    // Create the GraphQL server
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }) => ({ req }),
        introspection: true
    });

    const app = Express();

    const corsOptions = {
        origin: process.env.FRONTEND_URL,
        credentials: true // <-- REQUIRED backend setting
    };
    app.use(cors(corsOptions));

    app.use("/files", Express.static(path.join(__dirname, "/../files")));

    apolloServer.applyMiddleware({
        app,
        cors: false
    });

    // Start the server
    app.listen(PORT);
    console.log(
        `GraphQL Playground available at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
}

if (exit === false) {
    bootstrap();
}
else {
    console.log("please CTRL+C to getting back to commandline");
}