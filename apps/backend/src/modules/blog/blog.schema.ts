//this file defines the rules, aka
//what if we don't want to create certain fields when we create a blog instance?? this file will handle that
import {z} from 'zod'; //zod handles the safety of the User Input before it ever touches the logic
//import { buildJsonSchemas } from 'fastify-zod'; no longer needed because it doesn't work with my versions

// work for the content of the blog post 

const blogInput = {
    author: z.string(),
    title: z.string(),
    tags: z.string(),
    content: z.string(),
    backgroundPicUrl: z.string().optional().nullable() //has to be optional AND nullable or else u'll get a 500

}

const blogGenerated = {
    id: z.number(),
    createdAt: z.coerce.string(), //fastify didn't like how these were date objects and not strings,
    //so i have to coerce them to strings
    updatedAt: z.coerce.string()
}

const blogSummarySchema = z.object({
    ...blogInput,
    ...blogGenerated
}).omit({content: true}) //b/c we don't want to send back the entire content for list view

/************************************************************************************************************ */
const createBlogSchema = z.object({ //these are properties that we expect the user to pass in for us
    ...blogInput, //spread out our blog input from our consts that we generated above
});

const blogResponseSchema = z.object({
    ...blogInput,
    ...blogGenerated
});


const blogsResponseSchema = z.array(blogSummarySchema); //this is for returning an array of blogResponseSchemas


// export the VALUES (the Zod objects) 
//these are the actual materials used
// we need these in the blog.route.ts file for validation
export { createBlogSchema, blogResponseSchema, blogsResponseSchema };

// export the TYPES (the inferred shapes)
//these are like the blueprints
// we need these in the blog.service.ts and blog.controller.ts for annotations
export type CreateBlogInput= z.infer<typeof createBlogSchema>; //infer is a type, not a funciton, so we use <> not ()
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
export type BlogResponseSchema = z.infer<typeof blogResponseSchema>;
export type BlogsResponseSchema = z.infer<typeof blogsResponseSchema>;

//not needed since we're not using buildJsonSchemas, but I'll leave it here in case for reference 
// export const {} = buildJsonSchemas({ 
//     createBlogSchema,
//     createBlogResponseSchema,
//     blogResponseSchema,
//     blogsResponseSchema,

// });
