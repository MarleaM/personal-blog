import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import default_img from '../../assets/default.jpg'
import { Link } from 'react-router-dom';

interface BlogPage {
    author: string;
    title: string;
    tags: string;
    backgroundPicUrl: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
}

const BlogPage = () => {
const { id } = useParams<{ id: string }>();
//we want to render the page based off ot he id!!!
const [blogContent, setBlogContent] = useState<BlogPage>();
let formattedDate = "";
useEffect( () => {
        if (!id) return;
        async function fetchData() {
            try{
                const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
                const data = await response.json();
                setBlogContent(data);
                
            } catch (e) {
                console.error("Error fetching the data for this blog id! sorry");
            }
    
        }
        fetchData();
    }, [id]); //putting id in the dependency array so that we rerun if the id in the URL changes
    if (blogContent){
        const dateFormatted = new Date(blogContent.createdAt);
        formattedDate = dateFormatted.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    }

    return(
        
        <div className="container">
            <Link to="/" className="back-link">
                <button className="button-74" role="button"> &lt; back</button>
            </Link>
            <div className="blog-post-inner"> 
                <img src={blogContent?.backgroundPicUrl || default_img} className='blog-banner-img'>
                </img>
            </div>

            <article className="blog-body">
                {/* header info */}
                <header className="blog-header text-title" >
                    <h1 >{blogContent?.title}</h1>
                    <div className="blog-meta display-1">
                        {formattedDate}
                        <span className="author-name"> by {blogContent?.author}</span>
                    </div>

                </header>

                {/* contetn */}
                <div className="blog-content-text text-muted">  
                    {blogContent?.content}
                </div>

            </article>


        </div>
    )
}

export default BlogPage;