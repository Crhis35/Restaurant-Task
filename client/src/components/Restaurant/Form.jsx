import React from 'react';
import { ErrorMessage, Field, Form } from 'formik';
import { Button, FormGroup, Label, Input, FormFeedback, Col } from 'reactstrap';

const RestauranForm = ({ formik }) => {
  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormGroup>
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
      <FormGroup>
        <Label>City</Label>
        <Field
          as={Input}
          type="text"
          name="city"
          id="city"
          placeholder="Nombre"
          invalid={formik.touched.city && formik.errors.city ? true : false}
        />
        <ErrorMessage name="city">
          {(msg) => <FormFeedback>{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Field
          as={Input}
          type="text"
          name="address"
          id="address"
          placeholder="Nombre"
          invalid={
            formik.touched.address && formik.errors.address ? true : false
          }
        />
        <ErrorMessage name="address">
          {(msg) => <FormFeedback>{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
      <FormGroup row>
        <Label>Image </Label>
        <Col sm={10}>
          <Field
            as={Input}
            type="text"
            name="image"
            id="image"
            placeholder="Image url"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="exampleText" sm={3}>
          Description
        </Label>
        <Col sm={10}>
          <Field
            as={Input}
            type="textarea"
            name="description"
            id="description"
            invalid={
              formik.touched.description && formik.errors.description
                ? true
                : false
            }
          />
        </Col>
        <ErrorMessage name="description">
          {(msg) => <FormFeedback>{msg}</FormFeedback>}
        </ErrorMessage>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

RestauranForm.propTypes = {};

export default RestauranForm;
