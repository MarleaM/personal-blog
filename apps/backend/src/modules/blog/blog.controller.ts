import type { FastifyRegister, FastifyReply, FastifyRequest } from "fastify";
import { createBlog } from "./blog.service.js";
import { CreateBlogInput } from "./blog.schema.js";

export async function createBlogHandler(
    request: FastifyRequest<{ Body: CreateBlogInput }>, 
    reply: FastifyReply
) {
    try {
        // pass the body directly
        const blog = await createBlog(request.body);
        //  send a 201 (created) status code
        return reply.code(201).send(blog);
    } catch (e) {
        console.error(e);
        // if something breaks, send a 500 (internal server error)
        return reply.code(500).send({
            message: "Internal Server Error",
            error: e
        });
    }
}

//this is a function that we need to export
//so that app.ts can import the function. 
//This is all about seperation of concerns in 
//our backend.
//it takes in a request, which is a fastify request, 
//and a reply, which is also a fastify reply.
export async function registerBlogHandler(request: FastifyRequest, reply: FastifyReply){

}
