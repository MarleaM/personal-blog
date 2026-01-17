// this file apples the rules to specific URLs.

import type { FastifyInstance } from "fastify";
import { createBlogSchema, blogResponseSchema } from './blog.schema.js';
import {createBlogHandler} from './blog.controller.js';

async function blogRoutes(server: FastifyInstance){ //server: FastifyInstance just means that the server will be an instance of fastify
    //this is an endpoint to create a blog post

    //Note:
    //just listening on / insted of blogs/create
    //because in app.ts, we prefixed our route 
    // with api/blogs, so if we send a post 
    // request to this route here, we want to 
    // hit / handler.

    //for the second argument {}, this is where the 
    // rules (aka the zod schems) live. 

    //for the thirs option, this is the action. it
    //is the function that actually runs after the path
    //is matched and the data is validated
    //it takes the request and reply objects
    server.post('/',{
        schema:{
            body: createBlogSchema,
            response: {
                201: blogResponseSchema // tells Fastify how to format the sccuess reply
            }
        }
    },  createBlogHandler);
}

export default blogRoutes;


/*

// blog.route.ts
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from '@fastify/type-provider-zod';
import { createBlogSchema } from './blog.schema.js';
import { registerBlogHandler } from './blog.controller.js';

export async function blogRoutes(server: FastifyInstance) {
  // Use .withTypeProvider<ZodTypeProvider>() to enable the magic
  server.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        body: createBlogSchema, // Fastify now uses Zod directly!
      },
    },
    registerBlogHandler
  );
}


*/