/* eslint-disable react/prop-types */
const CardTotals = ({ total_emp }) => {
  return (
    <div className='totals absolute bottom-4'>
      <p className='font-bold text-blue-800 capitalize'>
        total of employees in store: {total_emp}
      </p>
      <p className='font-bold text-blue-800 capitalize'>
        total of products in store:{" "}
      </p>
    </div>
  );
};

export default CardTotals;
