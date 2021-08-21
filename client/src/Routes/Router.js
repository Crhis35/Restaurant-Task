import React, { Suspense, lazy } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';

import Header from '../components/Header/Header';
const Home = lazy(() => import('../pages/Home/Home'));
const CreateRestaurant = lazy(() => import('../components/Restaurant/Create'));
const CreateReservation = lazy(() =>
  import('../components/Reservation/Create')
);

const Routes = () => {
  return (
    <>
      <Header />
      <Container className="themed-container" fluid>
        <Switch>
          <Suspense
            fallback={
              <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
            }
          >
            <Route exact path="/" component={Home} />
            <Route exact path="/restaurants" component={CreateRestaurant} />
            <Route exact path="/reservations" component={CreateReservation} />
          </Suspense>
        </Switch>
      </Container>
    </>
  );
};

export default Routes;
