/* eslint-disable react/prop-types */
const StoreDeailsForm = ({
  handleActiveProduct,
  handleDesactiveProduct,
  price,
  setPrice,
}) => {
  return (
    <form className='mt-2 flex items-center gap-4'>
      <p className='capitalize font-semibold'>
        activer / desactive tous les labelroduits avec un prix qui depasse:
      </p>
      <input
        type='number'
        name='price'
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
        className='bg-transparent border-black w-28 pl-4 border-b-2'
      />

      <span>DZ</span>
      {price !== "" && (
        <div className='flex gap-2'>
          <button
            type='submit'
            onClick={handleActiveProduct}
            className='bg-green-600 text-white uppercase px-4 py-2 rounded-full hover:bg-green-700'
          >
            activer
          </button>
          <button
            type='submit'
            onClick={handleDesactiveProduct}
            className='bg-red-600 text-white uppercase px-4 py-2 rounded-full hover:bg-red-700'
          >
            desactive
          </button>
        </div>
      )}
    </form>
  );
};

export default StoreDeailsForm;
