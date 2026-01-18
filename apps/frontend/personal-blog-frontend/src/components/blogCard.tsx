import gif from '../assets/welcome.gif'
import test from '../assets/testing.jpg'
import resized_logo from '../assets/resized_logo.png'

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
                <div className = "card">
                    <div className = "overflow-img">
                        <a href = '#'>
                            <img src={backgroundPicUrl} className = "img-fluid">
                            </img>
                        </a>
                    </div>
                    <div className="card-body-text text-center">
                        <a href = {id} className = "text-title display-1">
                            {title}
                        </a>
                        <span>
                            <div className = "text-time display-3">
                                {formattedDate}
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;