/* eslint-disable react/prop-types */
const CardList = ({ title, data }) => {
  return (
    <div className='mt-2'>
      <p className='capitalize text-slate-500 font-bold '>{title}:</p>
      <div className='flex items-center justify-between w-4/5 pl-4 mt-1'>
        {data?.map((ele, index) => (
          <p key={index} className='capitalize  font-semibold'>
            emp1
          </p>
        ))}
      </div>
    </div>
  );
};

export default CardList;
