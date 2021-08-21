import React, { useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import RestauranForm from './Form';
import schema from './schema';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Create = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  if (loading)
    return <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;
  return (
    <Row className="justify-content-md-center">
      <Col xs lg="5">
        <Formik
          initialValues={{
            name: '',
            description: '',
            city: '',
            address: '',
            image: '',
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              await axios.post('/server/restaurants', values);
              toast.success('Restaurant created successfully');
              history.push('/');
            } catch (error) {
              console.log(error.response);
              toast.error('Error creating restaurant');
            } finally {
              setLoading(false);
            }
          }}
        >
          {(formik) => <RestauranForm formik={formik} />}
        </Formik>
      </Col>
    </Row>
  );
};

Create.propTypes = {};

export default Create;
