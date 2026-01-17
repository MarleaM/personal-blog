import type { FastifyRegister, FastifyReply, FastifyRequest } from "fastify";


//this is a function that we need to export
//so that app.ts can import the function. 
//This is all about seperation of concerns in 
//our backend.
//it takes in a request, which is a afastify request, 
//and a reply, which is also a fastify reply.
export async function registerBlogHandler(request: FastifyRequest, reply: FastifyReply){

}
