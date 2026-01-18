
import { useEffect, useState } from 'react'
import BlogCard from './blogCard'
import BlogFeatured from './blogFeatured'

// tells react what to expect from ur backend aka this should match ur schema
/*
eg
"author": "Marlea",
"title": "Blog Post #7",
"tags": "typescript, backend, learning",
"backgroundPicUrl": "httpes://blahblahblah.com",
"id": 6,
"createdAt": "Sun Jan 18 2026 16:40:05 GMT-0500 (Eastern Standard Time)",
"updatedAt": "undefined"
*/
interface Posts {
    author: string;
    title: string;
    tags: string;
    backgroundPicUrl: string;
    id: number;
    createdAt: string;
    updatedAt: string;
}

const Blog = () => {
    //speak to the api
    const [posts, setPosts] = useState<Posts[]>([]);
    useEffect ( () => {
        async function fetchData(){
            try{ 
                const response = await fetch('http://localhost:3000/api/blogs');
                const data = await response.json();
                setPosts(data.reverse()); //since im doing reverse chronological
            }catch (e) {
                console.error("Error fetching data from backend.");
            }
        }

        fetchData();

    }, []); //note: need the dependency array or else this will run forever, always refreshing and fetching data even if it already
    //fetched daya

    return (
        <div className="container">
            <div className = "grid">
                {posts.map((post, index) => {
                    const isFeatured = index % 4 == 0;

                    if (isFeatured) {
                        return (
                            <BlogFeatured
                                id={post.id}
                                title={post.title}
                                createdAt={post.createdAt}
                                backgroundPicUrl={post.backgroundPicUrl}
                            />
                        )
                    }

                    else {
                        return (
                            <BlogCard
                                id={post.id}
                                title={post.title}
                                createdAt={post.createdAt}
                                backgroundPicUrl={post.backgroundPicUrl}
                            />
                        )   
                    }

                })}
            </div>
        </div>



    )
}

export default Blog;