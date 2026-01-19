
import default_img from '../../../assets/default.jpg'

import { Link } from "react-router-dom";

interface BlogCardProps {
    title: string;
    backgroundPicUrl: string;
    id: number;
    createdAt: string;
}


const BlogCard = ({id, title, createdAt, backgroundPicUrl}: BlogCardProps) => {
    const dateFormatted = new Date(createdAt);
    const formattedDate = dateFormatted.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className = "grid-item">
            <div className = "blog">
                <Link to={`/blog/${id}`}>
                    <div className = "card">
                        <div className = "overflow-img">
                            <img src={backgroundPicUrl || default_img} className = "img-fluid">
                            </img>
                        </div>
                        <div className="card-body-text text-center">
                            <div className = "text-title display-1">
                                {title}
                            </div>
                            <div className = "text-time display-3">
                                {formattedDate}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BlogCard;