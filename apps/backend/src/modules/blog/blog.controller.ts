import type { FastifyRegister, FastifyReply, FastifyRequest } from "fastify";
import { createBlog, getBlogs, getBlogById } from "./blog.service.js";
import { CreateBlogInput } from "./blog.schema.js";
//this is a function that we need to export
//so that app.ts can import the function. 
//This is all about seperation of concerns in 
//our backend.
export async function createBlogHandler(
    request: FastifyRequest<{ Body: CreateBlogInput }>, 
    reply: FastifyReply
) {
    try {
        //pass the body directly
        const blog = await createBlog(request.body);
        //send a 201 (created) status code
        return reply.code(201).send(blog);
    } catch (e) {
        console.error(e);
        //if something breaks, send a 500 (internal server error)
        return reply.code(500).send({
            message: "Internal Server Error",
            error: e
        });
    }
}

//function for calling our service to get all blogs
export async function getBlogsHandler(){
    const blogs = await getBlogs();
    return blogs;
}

//function for calling our service to get a single blog by id
export async function getBlogByIdHandler(
    request: FastifyRequest<{Params: {id: string}}>, //the url will have the id parameter!
    reply: FastifyReply
){

    //note for later:
    //originally, i had const id = request.params;
    //this caused me to get a 500 error

    //this is because params is an object.
    //const id = request.params; would store { id: "3" }, and its data type would be object
    //const {id} = request.params; woyuld store "3" and its data type would be string (the item)
    const {id} = request.params;
    const blog = await getBlogById(Number(id));

    if (!blog) {
        return reply.code(404).send({message: "Blog not found! :( "});
    }

    return blog;
}