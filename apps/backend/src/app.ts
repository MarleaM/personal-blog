import Fastify from "fastify";
import blogRoutes from "./modules/blog/blog.route.js";

const server = Fastify();

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