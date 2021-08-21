import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  restaurant: Yup.string().required('Restaurant is required'),
  email: Yup.string().required('Email is required'),
  lastName: Yup.string().required('Last name is required'),
});
export default schema;
