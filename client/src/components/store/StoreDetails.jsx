import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CardList from "../card/CardList";
import CardSubTitle from "../card/CardSubTitle";
import CardProduct from "../products/CardProduct";
import StoreDeailsForm from "./StoreDeailsForm";

const StoreDetails = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState([]);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState("");
  const [actives, setActives] = useState(true);
  const url = "http://localhost:3000/api";
  const { storeId } = useParams();
  useEffect(() => {
    axios
      .get(`${url}/stores/${storeId}`)
      .then((res) => {
        setStore(res.data);
      })
      .catch((err) => console.error(err));
  }, [storeId]);

  useEffect(() => {
    axios
      .get(`${url}/store_products/allProd/${storeId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err.message));
  }, [storeId, actives]);

  const handleActiveProduct = (e) => {
    e.preventDefault();
    axios
      .patch(`${url}/products/active`, { price })
      .then(() => {
        actives ? setActives(false) : setActives(true);
      })
      .catch((err) => console.error(err.message));
    setPrice("");
  };

  const handleDesactiveProduct = (e) => {
    e.preventDefault();
    axios
      .patch(`${url}/products/desactive`, { price })
      .then(() => {
        actives ? setActives(false) : setActives(true);
      })
      .catch((err) => console.error(err.message));
    setPrice("");
  };
  const clickCard = (id) => {
    navigate(`/home/products/${id}`);
  };
  return (
    <div className='px-8'>
      <h1 className='text-4xl font-bold uppercase mt-4 text-center text-blue-700 italic mb-8'>
        {store.name}
      </h1>
      <aside className='aside p-4 shadow-xl mb-4 bg-blue-100 rounded-xl'>
        <CardSubTitle storeAdmin={"admin"} />
        <CardList title={"total Employees in store"} data={[]} />
        <CardList title={"total Products in store"} data={[]} />
        <StoreDeailsForm
          handleActiveProduct={handleActiveProduct}
          handleDesactiveProduct={handleDesactiveProduct}
          price={price}
          setPrice={setPrice}
        />
      </aside>
      <section className='flex gap-8 h-full'>
        <div className='products flex gap-4 flex-wrap items-center content-center border w-full'>
          {products.length > 0 ? (
            products.map(
              (
                { designation, price, qte, etat, category, id_product },
                index
              ) => (
                <CardProduct
                  key={index}
                  designation={designation}
                  price={price}
                  qte={qte}
                  etat={etat}
                  category={category}
                  onClick={() => clickCard(id_product)}
                />
              )
            )
          ) : (
            <div className='flex items-center justify-center w-full mt-8'>
              <p className='font-bold text-4xl capitalize'>
                no products in this store
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StoreDetails;
