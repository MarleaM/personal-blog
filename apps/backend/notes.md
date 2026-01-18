# NOTES on development process!
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

I ran this command to start the postgresql prisma instance: npx prisma init --datasource-provider postgresql

Then, I updated the schema in schema.prisma. There are notes on the datatypes in there. Then, in order to migrate the schema
to the database, I had to run npx prisma migrate dev --name init (init is the name of our migration in this case)

This originally failed since, when I switched to a different node.js version, I didn't have dotenv installed locally. So, if you are running
into the same problem, try running yarn add dotenv. Same problem with prisma, had to run yarn add prisma --dev. After this, it should hopefully start working. But unfortunately, because Im me, this also did not work, because my prisma.config.ts couldn't figure out what process was in
 url: process.env["DATABASE_URL"]. I tried installing @types/node  (yarn add --dev @types/node), this didn't do anything. Then, I realized
 that in my tsconfig, I set the "rootDir": "./src". This made it so that the prisma.config was blind to it. To fix it, I commented out rootDir. 
 This made this error go away, but I was still facing the problem of my database not running at localhost:5432. That's when I remembered that when I was trying to free up space on my laptop a few months ago, I had deleted postgresql (face palm). So I had to go to the downloader and redownload it (and when I did this, my computer bluescreened right at the end of the install [double face palm]). Yeah...I wasted way too much time on this!Go through the download stuff, and then add ur password. Don't put an @ in the password, I made this mistake and had to go into the
 PSQL terminal to change my password (the command is ALTER USER postgres WITH PASSWORD 'whatever_password_to_change_to'; if you're curious). After this, when you run ALTER USER postgres WITH PASSWORD 'new_password' it should say "your database is now in sync with your schema". You can verify for a sanity check by going into pgAdmin -> databases -> ur database -> schemas -> public -> tables -> ur table name -> columns. You should have also gotten a folder in your prisma folder called migrations, with files like migrations.sql. 

 Next, create a utils folder in src, and in utils make a file prisma.ts, this is to create the prisma connection. prisma.ts exports a prisma instance we can use throughout our application. 

 Now, go back to blog.service.ts, we're going to create our createBlog function!

Turns out, since my tutorial was 4 years old, I accidentally installed Prisma 7. In late 2025, Prisma removed their "Rust Engine" (the binary). Because Prisma 7 is lean, I had to install the PostgreSQL driver and the Prisma adapter separately.

 yarn add @prisma/adapter-pg pg
 yarn add -D @types/pg

 Now that the connection is fixed, I can finally run the generation and migration: 

npx prisma generate

npx prisma migrate dev --name init (this didn't do anything, but I did it just to be safe)

Next, it's time to work on fleshing out blog.service.ts. But to make sure that the user input is safe, we wnat to define our schema in blog.schema.ts. I wrote down some notes in there on what certain things are. Also, I found that I could no longer use fastify-zod for buildJsonSchemas, so instead i had to switch over to fastify-type-provider-zod. If you're following along, run this command:

yarn add fastify-type-provider-zod

Now, we write our services in blog.service.ts. We want to be able to create and post blogs. So, I wrote the createBlog and getBlogs services.I might go back and make the option to delete blogs later. 

Now, lets make our controllers to use these services in blog.controllers.ts. There will be some notes in this file on what I did.

After creating createBlogHandler, we need to hook the route up in blog.route.js. There will be some notes on what I did in this file too.

After this, test out the endpoint with postman. This is what I fed in: 
body: {
    "author": "Marlea",
    "title": "Blog Post #1",
    "tags": "typescript, backend, learning",
    "content": "This is a test post to see if my server actually works lol"
}
post: {{host}}/api/blogs (where host is my blog environment with localhost:3xxx already fleshed out)

At first i got a 500 error code because my databse wasn't connecting with prisma. To fix this, I added import 'dotenv/config'; to the top of my prisma.ts, because it wasn't finding my dotenv file.

The create blog request should now be good! now it's time to repeat the process, but this time for get-ing the blog posts.
aka, add this to controller, 
export async function getBlogsHandler(){
    const blogs = await getBlogs();
    return blogs;
}
then this to the routes:
    server.get('/', {
      schema:{
        response: {
          200: blogsResponseSchema
        }
      }
    }, getBlogsHandler);


### typescript cheat sheet syntax
Symbol,Name,Meaning in my Project
/:id,Path Parameter,"A ""wildcard"" in the URL that becomes a variable."
[ ],Array,A collection of multiple blog posts.
{ },Object,A single blog post or a set of configuration options.
< >,Generics,"A TypeScript tool to define the ""type"" of data inside a class or function."
