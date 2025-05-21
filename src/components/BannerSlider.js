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

  // Early return if no movies
  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <div className="banner-slider" style={{marginBottom:32,height:400,backgroundColor:'#f0f0f0',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12}}>
        <p style={{color:'#666',fontSize:'1.2rem'}}>Không có phim nào để hiển thị</p>
      </div>
    );
  }

  return (
    <div className="banner-slider" style={{marginBottom:32}}>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.slug}>
            <Link to={`/phim/${movie.slug}`}>
              <img
                src={movie.thumb_url}
                alt={movie.name}
                style={{width:'100%',height:400,objectFit:'cover',borderRadius:12}}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                }}
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