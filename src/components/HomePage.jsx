import React from "react";
import "./HomePage.css";

const images = {
  artImages: [
    { src: "https://i.pinimg.com/236x/a7/10/3d/a7103dd2484581fe5107d398ef852b78.jpg", alt: "Art 1" },
    { src: "https://i.pinimg.com/236x/1b/84/b2/1b84b2c6d61ea2a05eb7bd1d06200905.jpg", alt: "Art 2" },
    { src: "https://i.pinimg.com/236x/c8/dd/b0/c8ddb09c7801fc79d670792d68fa576f.jpg", alt: "Art 3" },
    { src: "https://i.pinimg.com/236x/c4/15/61/c41561ffe6f7231d513704f443eabc05.jpg", alt: "Art 4" },
    { src: "https://i.pinimg.com/236x/a0/ec/61/a0ec61afc97224d09b7110433f6f645c.jpg", alt: "Art 5" },
    { src: "https://i.pinimg.com/236x/20/db/7d/20db7db22f0f38c130dffbf7514e3009.jpg", alt: "Art 6" },
    { src: "https://i.pinimg.com/236x/9d/84/2b/9d842b8fb720803d1a144ccc04f077bd.jpg", alt: "Art 7" },
    { src: "https://i.pinimg.com/236x/d2/fa/e3/d2fae3a0282998bac66559b037e919a6.jpg", alt: "Art 8" }
  ],
  otherImages: {
    paintbrush: "https://i.pinimg.com/236x/b5/1c/da/b51cda70acde2409357ba6501768c356.jpg",
    palette: "https://i.pinimg.com/236x/ac/9f/d4/ac9fd447baa95e62d33fa92a1ed681bf.jpg"
  }
};

const HomePage = () => {
  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Discover Why Art Lovers Choose Us</h1>

      <div className="top-row">
        {images.artImages.slice(0, 6).map((image, index) => (
          <div key={index} className="image-card">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      <div className="bottom-row">
        <div className="left-column">
          <p className="description">
            Capturing Moments, One Brushstroke at a Time <br />
            Be the First to See Our Latest Creations <br />
            Join Us in Celebrating Art <br />
            Explore a World of Artistic Wonders
          </p>
          <img src={images.otherImages.paintbrush} alt="Paintbrush" className="small-image"/>
          <img src={images.otherImages.palette} alt="Palette" className="small-image"/>
        </div>

        <div className="right-column">
          <p className="description">
            Get to Discover Timeless Masterpieces and Emerging Talent
          </p>
          <div className="image-wrapper">
            {images.artImages.slice(6).map((image, index) => (
              <img key={index} src={image.src} alt={image.alt} className="art-image"/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
