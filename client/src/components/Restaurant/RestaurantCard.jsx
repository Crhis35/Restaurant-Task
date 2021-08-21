import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
} from 'reactstrap';

const RestaurantCard = ({ restaurant }) => {
  const { id, name, description, city, image } = restaurant;
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src={image || 'https://via.placeholder.com/200'}
          alt={`${name}`}
        />
        <CardBody>
          <Link to={`/restaurants/${id}`}>
            <CardTitle tag="h5">{name}</CardTitle>
          </Link>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            City: {city}
          </CardSubtitle>
        </CardBody>
        <CardBody>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default RestaurantCard;
