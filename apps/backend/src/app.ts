//this file sets up the engine (the Zod compilers).

import Fastify from "fastify";
import blogRoutes from "./modules/blog/blog.route.js";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import cors from '@fastify/cors'
import cloudinary from "./utils/cloudinary.js";
//import {createBlogSchema, blogsResponseSchema} from "./modules/blog/blog.schema.js";
const server = Fastify();
const url = cloudinary.url('swat_ugn2qv');
console.log(url);
//set the compilers (this is the global setup)
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(cors, { 
  origin: "http://localhost:5173", //react frontend is running on 5173
  methods: ['GET', 'POST', 'PUT', 'DELETE']
});

server.get('/healthcheck', async function(/*request, response [these are not used]*/){
    return {status: "OK"}; //return an object w/ the status ok (200)
});

async function main() {
    //we are now going to register the routes!
    server.register(blogRoutes, {prefix: 'api/blogs'})
    
    try{
        await server.listen(
            {port: 3000, host: "0.0.0.0",}
        );
        console.log("server ready at http://localhost:3000");
    } catch(e){
        console.error(e);
        process.exit(1); //we exited with a failure
    }

}

main();