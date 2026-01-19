
import default_img from '../../../assets/default.jpg'

import {Link} from 'react-router-dom';
//sicne were using typescript we habe to define props
interface BlogFeaturedProps {
    title: string;
    backgroundPicUrl: string;
    id: number;
    createdAt: string;
}

const BlogFeatured = ({id, title, createdAt, backgroundPicUrl}: BlogFeaturedProps) => {
    const dateFormatted = new Date(createdAt);
    const formattedDate = dateFormatted.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    return (
        /* This container tells the grid to take up 2 spots */
        <div className="featured-item">
            <div className="blog">
                <Link to={`/blog/${id}`}>
                    <div className="card">
                        <div className="overflow-img-featured">
                            <img src={backgroundPicUrl || default_img} className="img-featured" alt="featured" />
                        </div>
                        <div className="card-body-text text-center">
                            <div className="text-title display-1">
                                {title}
                            </div>
                            <div className="text-time display-3">
                                {formattedDate}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BlogFeatured;