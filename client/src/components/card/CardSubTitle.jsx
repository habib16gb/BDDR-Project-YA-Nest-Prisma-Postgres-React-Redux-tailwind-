/* eslint-disable react/prop-types */
const CardSubTitle = ({ storeAdmin }) => {
  return (
    <h3 className='mt-4 font-bold text-slate-600'>
      Admin: <span className=' uppercase '>{storeAdmin}</span>
    </h3>
  );
};

export default CardSubTitle;
