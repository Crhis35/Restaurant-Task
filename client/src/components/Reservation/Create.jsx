import React, { useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import ReservationForm from './Form';
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
            restaurant: '',
            email: '',
            name: '',
            lastName: '',
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              await axios.post('/server/reservations', values);
              toast.success('Reservation created successfully');
              history.push('/');
            } catch (error) {
              console.log(error.response);
              toast.error(error.response.data.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          {(formik) => <ReservationForm formik={formik} />}
        </Formik>
      </Col>
    </Row>
  );
};

Create.propTypes = {};

export default Create;
