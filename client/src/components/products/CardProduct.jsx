/* eslint-disable react/prop-types */
const CardProduct = ({ designation, price, qte, etat, category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg cursor-pointer'
    >
      <img
        className='h-48 w-full object-cover object-center'
        src='https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg'
        alt='Product Image'
      />
      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <h2 className='mb-2 text-lg font-medium dark:text-white text-gray-900 capitalize'>
            {designation}
          </h2>
          <h2
            className={`bg-${
              etat === "ACTIVE" ? "green" : "red"
            }-400 w-4 h-4 rounded-full`}
          ></h2>
        </div>
        <p className='mb-2 text-base dark:text-gray-300 text-gray-700 capitalize  '>
          category <span className='font-bold'>{category}</span>
        </p>
        <p
          className={`mb-2 text-base dark:text-gray-300  font-semibold ${
            qte === 0 ? "text-red-700 line-through" : "text-green-700"
          } capitalize`}
        >
          quantity in store <span className='font-bold'>{qte}</span>
        </p>
        <p className='mb-2 text-base dark:text-gray-300 text-gray-700 capitalize '>
          Product description goes here.
        </p>
        <div className='flex items-center'>
          <p className='mr-2 text-lg font-semibold text-gray-900 dark:text-white'>
            {price - (price * 20) / 100} DZ
          </p>
          <p className='text-base  font-medium text-gray-500 line-through dark:text-gray-300'>
            {price} DZ
          </p>
          <p className='ml-auto text-base font-medium text-green-500'>
            20% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
