import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BannerSlider({ movies = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="banner-slider" style={{marginBottom:32}}>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie._id}>
            <Link to={`/phim/${movie.slug}`}>
              <img
                src={movie.thumb_url}
                alt={movie.name}
                style={{width:'100%',height:400,objectFit:'cover',borderRadius:12}}
              />
              <div className="banner-caption" style={{
                position:'absolute',bottom:40,left:40,color:'#fff',textShadow:'0 2px 8px #000',fontSize:'2rem',fontWeight:'bold'
              }}>
                {movie.name}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BannerSlider;