import type { FastifyInstance } from "fastify";
import {registerBlogHandler} from './blog.controller.js';

async function blogRoutes(server: FastifyInstance){ //server: FastifyInstance just means that the server will be an instance of fastify
    //this is an endpoint to create a blog post

    //Note:
    //just listening on / insted of blogs/create
    //because in app.ts, we prefixed our route 
    // with api/blogs, so if we send a post 
    // request to this route here, we want to 
    // hit / handler.
    server.post('/', registerBlogHandler);
}

export default blogRoutes;