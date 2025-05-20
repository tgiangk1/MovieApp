import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function BannerSlider({ movies }) {
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

  return (
    <div className="banner-slider" style={{marginBottom:32}}>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id}>
            <Link to={`/phim/${movie.id}`}>
              <img
                src={IMAGE_BASE + movie.backdrop_path}
                alt={movie.title}
                style={{width:'100%',height:400,objectFit:'cover',borderRadius:12}}
              />
              <div className="banner-caption" style={{
                position:'absolute',bottom:40,left:40,color:'#fff',textShadow:'0 2px 8px #000',fontSize:'2rem',fontWeight:'bold'
              }}>
                {movie.title}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BannerSlider;