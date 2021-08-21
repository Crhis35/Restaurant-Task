import React, { useEffect, useState } from 'react';

import axios from 'axios';
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from 'reactstrap';
import RestaurantCard from '../../components/Restaurant/RestaurantCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try {
        const url = `/server/restaurants?limit=2&page=${page}`;
        const { data } = await axios.get(url);
        setRestaurants(data.data);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };
    if (isSubscribed) fetchData();
    return () => {
      isSubscribed = false;
    };
  }, [page]);

  const next = () => {
    setPage(page + 1);
  };

  const prev = () => {
    setPage(page - 1);
  };

  if (loading)
    return <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <h1>Restaurant</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
          {restaurants.length > 0 ? (
            restaurants.map((res) => (
              <RestaurantCard key={res.id} restaurant={res} />
            ))
          ) : (
            <h3>No more Restaurants</h3>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <div>
            <Pagination>
              <PaginationItem>
                <PaginationLink
                  previous
                  disabled={page === 1}
                  onClick={() => prev()}
                />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#">{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  next
                  onClick={() => next()}
                  disabled={restaurants.length === 0}
                />
              </PaginationItem>
            </Pagination>
          </div>
        </Col>
      </Row>
    </>
  );
};

Home.propTypes = {};

export default Home;
