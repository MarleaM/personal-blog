import test from '../assets/testing.jpg'

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
                <div className="card">
                    <div className="overflow-img-featured">
                        <a href='#'>
                            <img src={backgroundPicUrl} className="img-featured" alt="featured" />
                        </a>
                    </div>
                    <div className="card-body-text text-center">
                        <a href='#' className="text-title display-1">
                            {title}
                        </a>
                        <div className="text-time display-3">
                            {formattedDate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogFeatured;