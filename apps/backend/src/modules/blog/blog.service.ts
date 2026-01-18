import { prisma } from "../../utils/prisma.js";
//import { Prisma } from "../../generated/prisma/client.js"
import { CreateBlogInput } from "./blog.schema.js";

// We tell TS that input matches exactly what the database expects for a new blog
export async function createBlog(input: CreateBlogInput) { //our createbloginput, which is made in our blog schema file!
    //we import prisma from our utils directory, 
    //then we do .blog.create
    //create takes in an object, the first property is data, which will be our input, which 
    // //we know is valid, since it's an instance from our blog.schema, which ensures we have correct items!!
    const blog = await prisma.blog.create({
        data: input,
    });

    return blog;
}

//grabemultiple blog posts
export function getBlogs(){
    return prisma.blog.findMany({
        select:{
            id: true,// this is required for react keys and navigation links
            title: true,    
            author: true,   
            createdAt: true, 
            tags: true,     
            backgroundPicUrl: true,
            // usually u don't return the FULL content in a list
            // b/c it makes the API response huge
            content: false,
        }
    })
}

//grab just one blog post
export async function getBlogById(id: number) {
    return await prisma.blog.findUnique({
        where: {id}
    });
}