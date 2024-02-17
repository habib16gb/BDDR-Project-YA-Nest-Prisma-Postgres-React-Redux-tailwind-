/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Table = ({ dataTable, ths, handleDelete, handleEdit }) => {
  return (
    <table className='w-full flex-grow-1 shadow-lg rounded-lg  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          {ths?.map((th, i) => (
            <th scope='col' className='px-6 py-3' key={i}>
              {th.label}
            </th>
          ))}
          <th scope='col' className='px-6 py-3'>
            <span>Edit</span>{" "}
          </th>
          <th scope='col' className='px-6 py-3'>
            <span>Delete</span>{" "}
          </th>
        </tr>
      </thead>
      <tbody>
        {dataTable?.map((ele, i) => (
          <tr
            className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            key={i}
          >
            <th
              scope='row'
              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
            >
              {ele.id}
            </th>
            {ths
              .filter((th) => !th.hidden)
              .map(({ label }, i) => (
                <td className='px-6 py-3' key={i}>
                  {ele[label]}
                </td>
              ))}

            <td className='px-6 py-4'>
              <button
                onClick={() => handleEdit(ele.id)}
                className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
              >
                Edit
              </button>
            </td>
            <td className='px-6 py-4'>
              <button
                onClick={() => handleDelete(ele.id)}
                className='font-medium text-red-600 dark:text-red-500 hover:underline'
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
