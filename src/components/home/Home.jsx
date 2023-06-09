import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { getAllProducts, deleteProduct } from '../../redux/products/products';
import './Home.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Home = () => {
  const [, setSwiperRef] = useState(null);
  const [done, setDone] = useState(undefined);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user.data);
  const isAuthenticated = useSelector((state) => state.user.loggedIn);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const override = css`
  display: block;
  margin: 0 auto;
`;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      setDone(true);
    }
  }, [products]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="container">
      {!done ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <RingLoader color="#123abc" css={override} size={200} />
          <p className="s">
            Please wait for approximately
            <br />
            <span>
              30 seconds
            </span>
          </p>
        </div>
      ) : (
        <div className="home-cont">
          <h1>Our Products</h1>
          <p className="title-bar">Please select a Product</p>

          {isMobile ? (
            <div className="swiper">
              {products.length === 0 ? (
                <span>Add Product first!!!</span>
              ) : (
                products.map((product) => (
                  <div
                    key={product.id * Math.random(10000) + Math.random(5000)}
                    className="swiper-slide"
                  >
                    <Link to={`/productdetails/${product.id}`}>
                      <img src={product.image} alt={product.name} />
                    </Link>

                    <div className="card-body">
                      <Link to={`/productdetails/${product.id}`}>
                        <h2>{product.name}</h2>
                      </Link>
                      <div>
                        <p>
                          Price:&nbsp;
                          {product.unit_price}
                          &nbsp;$ (USD)
                        </p>
                        <Link to={isAuthenticated ? `/addorder/${product.id}` : '/login-page'}>
                          <button
                            type="button"
                            style={{ background: '#cce0ff65' }}
                            className="button"
                          >
                            Order
                          </button>
                        </Link>
                        <br />
                        {user.role === 'admin' ? (
                          <button
                            type="button"
                            className="button"
                            style={{ color: 'black' }}
                            onClick={() => {
                              handleDelete(product.id);
                            }}
                          >
                            Remove
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <Swiper
              onSwiper={setSwiperRef}
              slidesPerView={3.2}
              centeredSlides
              spaceBetween={20}
              navigation
              scrollbar={{ draggable: true }}
              modules={[Pagination, Navigation]}
              style={{ display: products.length === 0 ? 'unset' : 'flex' }}
            >
              {products.length === 0 ? (
                <span>Add Product first!!!</span>
              ) : (
                products.map((product) => (
                  <SwiperSlide
                    key={product.id * Math.random(10000) + Math.random(5000)}
                  >
                    <Link to={`/productdetails/${product.id}`}>
                      <img src={product.image} alt={product.name} />
                    </Link>

                    <div className="card-body">
                      <Link to={`/productdetails/${product.id}`}>
                        <h2>{product.name}</h2>
                      </Link>
                      <div>
                        <p>
                          Price:&nbsp;
                          {product.unit_price}
                          &nbsp;$ (USD)
                        </p>
                        <Link to={isAuthenticated ? `/addorder/${product.id}` : '/login-page'}>
                          <button
                            type="button"
                            style={{ background: '#cce0ff65' }}
                            className="button"
                          >
                            Order
                          </button>
                        </Link>
                        <br />
                        {user.role === 'admin' ? (
                          <button
                            type="button"
                            className="button"
                            style={{ color: 'black' }}
                            onClick={() => {
                              handleDelete(product.id);
                            }}
                          >
                            Remove
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
