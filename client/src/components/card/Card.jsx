/* eslint-disable react/prop-types */
import CardTitle from "./CardTitle";
import CardSubTitle from "./CardSubTitle";
import CardTotals from "./CardTotals";

const Card = ({ name, storeAdmin, total_emp, clickCard }) => {
  return (
    <div
      onClick={clickCard}
      className='store rounded-md p-4 bg-slate-100 shadow-inner w-80 h-40 relative cursor-pointer hover:bg-slate-200'
    >
      <CardTitle name={name} />
      <CardSubTitle storeAdmin={storeAdmin} />
      <CardTotals total_emp={total_emp} />
    </div>
  );
};

export default Card;
