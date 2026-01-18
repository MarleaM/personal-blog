import welcome_gif from '../assets/welcome.gif';

const Hero = () => {
    return (
        <div className = "container">
            <div className = "hero-outer">
                <div className = "hero-left">
                    <h1>
                    <span className="text-muted">Hello! I'm Marlea. Welcome to my</span> blog<span className="text-muted">.</span> 
                    <br /><br />
                    <span className="text-muted">I'm currently</span> reviewing food<span className="text-muted">, </span> 
                    yapping <span className="text-muted">about what I've learned in</span> class<span className="text-muted">, 
                    and documenting my days at</span> work<span className="text-muted">.</span> 🐔🌷
                    </h1>

                </div>

                <div className = "overflow-img">
                    <img src={welcome_gif} alt = "welcome gif" className="img-fluid">
                    </img>
                </div>
            </div>
        </div>
    )
}

export default Hero;