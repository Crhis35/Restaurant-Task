import React, { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form } from 'formik';
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const RestauranForm = ({ formik }) => {
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `/server/restaurants`;
        const { data } = await axios.get(url);
        setRestaurant([
          {
            text: 'None',
            value: '',
            key: 1,
          },
          ...data.data.map((item) => ({
            text: item.name,
            value: item.id,
            key: item.id,
          })),
        ]);
      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    if (isSubscribed) fetchData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  if (loading)
    return <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Label>Restaurants</Label>
        <Input
          type="select"
          name="restaurant"
          onChange={(e) => formik.setFieldValue('restaurant', e.target.value)}
        >
          {restaurant.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </Input>
        <ErrorMessage name="restaurant">
          {(msg) => <FormFeedback>{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Field
          as={Input}
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          invalid={formik.touched.email && formik.errors.email ? true : false}
        />
        <ErrorMessage name="email">
          {(msg) => <FormFeedback>{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
      <FormGroup row>
        <Label>Name</Label>
        <Field
          as={Input}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          invalid={formik.touched.name && formik.errors.name ? true : false}
        />
        <ErrorMessage name="name">
          {(msg) => <FormFeedback>{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
      <FormGroup row>
        <Label>Last name</Label>
        <Field
          as={Input}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
          invalid={
            formik.touched.lastName && formik.errors.lastName ? true : false
          }
        />
        <ErrorMessage name="lastName">
          {(msg) => <FormFeedback>{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

RestauranForm.propTypes = {};

export default RestauranForm;
