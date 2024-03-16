import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import './product.css';
import fastorLogo from '../Static/fastor_logo.svg';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';

const DetailsProduct = () => {
  const navigate = useNavigate();
  const data = useSelector(state => state.user.dataArray);

  const product = data && data.length > 0 ? data[0] : null;


  const handleShare = async () => {
    try {
      const imageUrl = Object.values(product.images[0]);

      await navigator.clipboard.writeText(imageUrl);

      if (navigator.share) {
        await navigator.share({
          title: product.restaurant_name,
          text: product.address_complete,
          url: imageUrl,
        });
      } else {
        console.log('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <>
      <ArrowBackIosNewIcon
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '999', cursor: "pointer" }}
        fontSize="small"
        onClick={() => navigate('/product')}
      />
      <ShareOutlinedIcon onClick={handleShare} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '999', cursor: "pointer" }}
        fontSize="small" />

      <div className='productDetails_container'>
        <div className='image-container'>
          {product && (
            <div className="image-wrapper">
              <img src={Object.values(product.images[0])} alt="Product" className="product-image" />
              <img src={fastorLogo} alt='fastorLogo' className="fastor-logo" />
            </div>
          )}
        </div>
        <div className='details-container'>
          {product && (
            <>
              <h2>{product.restaurant_name}</h2>
              <p>Address: {product.address_complete}</p>
              <p>Mode: {product.restaurant_mode}</p>
              <p>Status: {product.status}</p>
              <p style={{display:"flex",flexDirection:"row",gap:"4px"}}>Rating:
                
                {product.rating.restaurant_avg_rating} <div ><StarBorderPurple500OutlinedIcon color="primary"/></div> </p>
              <p>Price for two: ${product.avg_cost_for_two}</p>

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsProduct;


