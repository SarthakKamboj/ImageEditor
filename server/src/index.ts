import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { getSchema } from './BuildSchema';
require('dotenv').config();

const PORT = parseInt(process.env.SERVER_PORT as string) || 3000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

(async () => {
    try {
        const app = express();

        const RedisStore = connectRedis(session);
        const redisClient = redis.createClient();

        app.use(
            session({
                name: 'qid',
                store: new RedisStore({
                    client: redisClient,
                    disableTouch: true,
                }),
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 356 * 10,
                    httpOnly: false,
                    secure: false,
                },
                saveUninitialized: false,
                secret: process.env.REDIS_SECRET as string,
                resave: false,
            })
        );

        const apolloServer = new ApolloServer({
            // typeDefs,
            schema: await getSchema(),
            context: ({ req, res }) => ({ req, res }),
        });

        apolloServer.applyMiddleware({ app, cors: corsOptions });

        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
})();

process.on('SIGINT', () => {
    console.log('Bye bye!');
    process.exit();
});
