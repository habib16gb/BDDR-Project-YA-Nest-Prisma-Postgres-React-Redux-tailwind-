/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const HomeManagers = ({ managers }) => {
  return (
    <div className='managers p-4 shadow-lg capitalize text-slate-500'>
      <h3 className='capitalize font-bold text-center'>list of managers </h3>
      {managers?.map((manager, index) => (
        <div key={index} className='flex items-center justify-between'>
          <span>{manager.id_manager}</span>
          <span>{manager.name}</span>
        </div>
      ))}
    </div>
  );
};

export default HomeManagers;
