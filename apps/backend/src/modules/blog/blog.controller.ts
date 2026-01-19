import type { FastifyRegister, FastifyReply, FastifyRequest } from "fastify";
import { createBlog, getBlogs, getBlogById } from "./blog.service.js";
import { CreateBlogInput } from "./blog.schema.js";
import { uploadToCloudinary } from '../../utils/cloudinary.js';
//so that app.ts can import the function. 
//this file helps with seperation of concerns in 
//the backend, it does all of the formatting before touching our service cause 
// we need to process the image upload
export async function createBlogHandler(
    request: FastifyRequest<{ Body: CreateBlogInput }>, 
    reply: FastifyReply
) {
    try {
        const reqWithFile = request as typeof request & { file: any }; //hacky way to get this crap working, this casts the request tp include the multer file property
        const file = reqWithFile.file;
        // console.log("Body:", request.body); 
        // console.log("File:", reqWithFile.file); 
        if (!file) {
            return reply.code(400).send({ message: "background image is required" });
        }
        const imageUrl = await uploadToCloudinary(file.buffer);

        const blogData = {
            ...request.body, // author, title, tags, content
            backgroundPicUrl: imageUrl // overwrite the backgroundPic's null/empty value with the real link!!!!!! RAHHHHHHHHHH
        };
        //pass the blog information that has been completed
        const blog = await createBlog(blogData);
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