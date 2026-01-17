# NOTES
## to run,
yarn dev

## geeting things set up
I had to change my node version from the latest down to v20. I had to uninstall node and install NVM. 
these are the commands I used to start using 20:

C:\Users\marke>nvm install 20
Downloading node.js version 20.20.0 (64-bit)...
Extracting node and npm...
Complete
Installation complete.
If you want to use this version, type:

nvm use 20.20.0

C:\Users\marke>nvm use 20
Now using node v20.20.0 (64-bit)

C:\Users\marke>node -v
v20.20.0

C:\Users\marke>

# REMEMBER
these should be installed in the backend folder

# NOTES on setup
## initing
install yarn if you haven't yet

npm install -g yarn

yarn init 

## dependencies

npx tsc --init (tsc is the TypeScript compiler executable. This creates a tsconfig.json in your project root.)

yarn add fastify @fastify/jwt @fastify/swagger fastify-zod zod zod-to-json-schema @prisma/client

yarn add -D typescript tsx @types/node

Then I added the src folder with my app.ts file 
and started up my server. 

## config fixes
There was an issue with my Fastify import. 
'''
ECMAScript imports and exports cannot be written in a CommonJS file under 'verbatimModuleSyntax'.
'''

tsconfig.json: The verbatimModuleSyntax error happened because the compiler was confused about the module system. To fix the "Cannot find module" and "CommonJS file" errors, use these settings:

module/moduleResolution: Set both to NodeNext.

target: Set to ES2022 or higher.

rootDir/outDir: Explicitly set to ./src and ./dist.

I also had to change my 
tsconfig. In the file, I put notes on what fields
I had to update in order to get things working.
something that might help:
package.json: Add "type": "module" to enable ESM and update the dev script.

"type": "module",
"scripts": {
  "dev": "tsx watch src/app.ts" <------ use THIS script
}

## ALSO note

Because we are using "type": "module", all local imports must include the .js extension, even though the source files are .ts.

Correct: import { routes } from "./routes.js"

Incorrect: import { routes } from "./routes"

# Actually Building Things

Then, I made the first endpoint, /healthcheck. This is so that I can ping the server and make sure that everything is ok, and that I didn't mess up the set up of the server.

Then, I created the modules folder. In the modules folder, I made a blog subfolder.
In this blog subfolder, I made four files:
blog.controller.ts
blog.route.ts
blog.schema.ts
blog.service.ts

I first set up my blogRoutes in blog.route.ts, then imported them in app.ts (this is line 2). Then, I registered the routes, giving them a prefic of api/blogs. [this is the line server.register(blogRoutes, {prefix: 'api/blogs'}) in app.tsx].


next up, I created the landing for my endpoint in blog.route.ts. 
'''
server.post('/', registerBlogHandler);
'''
note how I did not do /api/blog/ for the endpoint and just /. This is because we registered this endpoint with a prefic of api/blogs. So, this post service only needs / for this to work.

This causes the server to go down because of an error, since registerBlogHandler has not been made yet. So, logically, the next step is to create the blog handler. Going to blog.controller.ts, I created registerBlogHandler. This is a function that we need to export so that our main fiile, app.ts, can import the function. This is all about seperation of concerns in our backend.
It takes in a request, which is a a fastify request, and a reply, which is also a fastify reply.
'''
export async function registerBlogHandler(request: FastifyRequest, reply: FastifyReply){

}
'''
Then, we import this in our blog.route.js to hook everything up!

Now we want to create a blog post, but we don't have any database or anything set up yet. So, let's change gear, and set up this db so that we can start making blogs.