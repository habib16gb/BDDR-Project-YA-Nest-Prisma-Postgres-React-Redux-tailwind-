/* eslint-disable react/prop-types */
import HomeFormAddBtn from "./HomeFormAddBtn";
import HomeFormElement from "./HomeFormElement";

const HomeForm = ({
  values,
  setValues,
  handleSubmit,
  inputRef,
  errs,
  managers,
}) => {
  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <HomeFormElement
        name={"name"}
        type={"text"}
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        inputRef={inputRef}
      />
      {/* <HomeFormElement
        name={"id_manager"}
        type={"number"}
        value={values.id_manager}
        onChange={(e) => setValues({ ...values, id_manager: +e.target.value })}
        inputRef={null}
      /> */}
      <select
        className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer mb-4'
        value={values.id_manager}
        name={"id_manager"}
        onChange={(e) => setValues({ ...values, id_manager: +e.target.value })}
      >
        <option defaultValue={"Choose a manager"}>Choose a manager</option>
        {managers?.map((manager, index) => (
          <option key={index} value={manager?.id_manager}>
            {manager?.name}
          </option>
        ))}
      </select>
      <div className='errs'>
        {errs.map((err, index) => (
          <p
            key={index}
            className='text-center text-red-600 font-semibold mb-2'
          >
            {err}
          </p>
        ))}
      </div>
      <HomeFormAddBtn />
    </form>
  );
};

export default HomeForm;
