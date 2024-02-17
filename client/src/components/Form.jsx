/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
const Form = ({ ths, values, setValues, handleSubmit, errsMsg, inputsRef }) => {
  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      {ths?.map((th, index) => (
        <div
          key={index}
          className={`relative z-0 w-full mb-5 group ${th.hidden && "hidden"}`}
        >
          <input
            ref={th.ref}
            name={th.label}
            id={th.label}
            type={th.type}
            value={values.label}
            onChange={(e) =>
              setValues({
                ...values,
                [e.target.id]:
                  th.type === "number" ? +e.target.value : e.target.value,
              })
            }
            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
            placeholder=' '
          />
          <label
            htmlFor={th.label}
            className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            {th.label}
          </label>
        </div>
      ))}
      {errsMsg.length > 0 &&
        errsMsg?.map((errMsg, index) => (
          <div
            key={index}
            className='text-red-600 text-sm font-bold capitalize text-center mb-2'
          >
            {errMsg}
          </div>
        ))}

      <button
        type='submit'
        className='text-white uppercase bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
      >
        Add
      </button>
    </form>
  );
};

export default Form;
