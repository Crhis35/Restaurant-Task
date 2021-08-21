import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  description: Yup.string().required('Description is required'),
  city: Yup.string().required('City is required'),
  image: Yup.string(),
});
export default schema;
