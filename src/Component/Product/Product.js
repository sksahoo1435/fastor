import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './product.css';
import Carousel from 'react-material-ui-carousel'
import Box from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import pizza from '../Static/pizza.jpeg';
import burger from '../Static/burger.jpeg';
import Noodles from '../Static/Noodles.jpeg';
import french_fries from '../Static/french_fries.jpeg';
import kabab from '../Static/kabab.jpeg';
import pasta from '../Static/pasta.jpeg';
import icecream from '../Static/ice-cream.jpeg';
import WalletIcon from '@mui/icons-material/Wallet';
import offer from '../Static/offers.png'
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import { useNavigate } from 'react-router-dom';
import { addData } from '../Slices/userSlice';
const Product = () => {

  const [productData, setProductData] = useState([]);
  const tokenData = useSelector(state => state.user.token);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchData = async () => {
    const apiUrl = 'https://staging.fastor.in/v1/m/restaurant?city_id=119';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData[0].token}`
        }
      });

      const data = await response.json();

      if (response.status === 200) {
        setProductData(data)
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }


  useEffect(() => {
    fetchData();
  }, []);


  const goToProductDetails = (item) => {
    dispatch(addData(item));
    navigate('/productdetails')

  }


  var items = [icecream, pizza, french_fries, kabab, burger, Noodles, pasta]

  return (
    <>
      <div className='product_container'>

        <div className='product_container_nav'>

          <div className='product_container_nav_icon'>
            <p>Pre Order From </p>
            <div className='person_icon'>
              <PersonOutlineIcon fontSize="small" />
            </div>

          </div>

          <div className='product_container_nav_placename'>
            <p>Connaught Place</p>
          </div>
        </div>

        <div className='product-scrollbody'>

          <div className='product_forUser'>
            <div className='userDetails'>

              <img src={tokenData[0].user_image} alt="user" />

              <p>{tokenData[0].user_name}</p>

              <p>Let's Explores this evening.</p>

            </div>

            <div className='offerZone'>

              <div className='offerzone-icons'>
                <img src={offer} alt='offer' height="80%" />
              </div>

              <div className='offerzone-icons'>
                <WalletIcon sx={{ fontSize: 50 }} color="secondary" />
              </div>


            </div>
          </div>

          <div className='food_items'>
            <Carousel>
              {
                items.map((item, i) =>
                  <Box key={i}
                    height={250}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src={item} alt="item" width="50%" height="95%" />
                  </Box>)
              }
            </Carousel>
          </div>

          <h2>Popular Ones</h2>

          <div className='hotels-container'>

            {productData && productData.length > 0 && productData.map((item, ind) =>
              <div className='hotels' key={ind} onClick={(e) => goToProductDetails(item)}>

                <div className='hotel-img'>
                  <img src={Object.values(item.images[0])} alt={item.active_plan_id} width="95%" />
                </div>

                <div className='hotel-about'>

                  <div className='hotelNameNaddress'>
                    <div> <h3>{item.restaurant_name}</h3></div>

                    <div>
                      <p>{item.restaurant_mode}</p>
                      <p>{item.restaurant_uuid}</p>
                      <p>{item.status}</p>
                    </div>

                  </div>

                  <div className='hotelRatingNcost'>

                    <div className='hotelRatingNcost_item'>
                      <div className='start_icon'>
                        <StarBorderPurple500OutlinedIcon />
                      </div>
                      <p>{item.rating.restaurant_avg_rating}</p>
                    </div>

                    <div className='hotelRatingNcost_item'>
                      <p>Price</p>
                      <p>${item.avg_cost_for_two}</p>
                    </div>

                  </div>

                </div>
              </div>)}

          </div>

        </div>
      </div>
    </>

  )
}

export default Product