import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontWeight:'bold',fontSize:'2rem',letterSpacing:2}}>
          <span role="img" aria-label="film">🎬</span> RoPhim Clone
        </div>
        <nav>
          <a href="/" className="nav-link">Trang chủ</a>
          <a href="/" className="nav-link">Phim lẻ</a>
          <a href="/" className="nav-link">Phim bộ</a>
          <a href="/" className="nav-link">Thể loại</a>
          <a href="/" className="nav-link">Quốc gia</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;