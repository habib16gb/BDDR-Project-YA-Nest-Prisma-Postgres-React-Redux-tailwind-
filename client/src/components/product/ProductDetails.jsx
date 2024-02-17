/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams();
  const url = "http://localhost:3000/api";
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    axios
      .get(`${url}/store_products/allProds/${productId}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err.message));
  }, [productId]);

  useEffect(() => {
    axios
      .get(`${url}/store_products/totalProducts/${productId}`)
      .then((res) => {
        setTotal(res.data?.[0].sum);
      })
      .catch((err) => console.error(err));
  }, [productId]);
  return (
    <div className='px-8'>
      <h1 className='text-4xl font-bold uppercase mt-4 text-center text-blue-700 italic mb-8'>
        {product?.[0]?.["designation"]}
      </h1>
      <div className='flex items-center justify-evenly h-full'>
        <h2 className='text-2xl font-semibold text-gray-600 capitalize'>
          price:
          <span>
            {product?.[0]?.price.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {" DZ"}
          </span>
        </h2>
        <h2 className='text-2xl font-semibold text-gray-600 capitalize'>
          etat: <span>{product?.[0]?.["etat"]}</span>
        </h2>
      </div>
      <div className='flex gap-4 flex-wrap items-center content-center border w-full mt-8 justify-evenly'>
        {product?.map((ele) => (
          <div key={ele.id_store} className='shadow-md p-8 rounded-lg text-xl'>
            <img
              src='https://media.istockphoto.com/id/912819604/vector/storefront-flat-design-e-commerce-icon.jpg?s=612x612&w=is&k=20&c=Hns5AUFI0-x_0tUeyo6x187DA2OBxOFWlG_27khfB4M='
              alt='store'
              className="h-48 w-full object-cover object-center'"
            />
            <h2 className='mb-2 text-md mt-4 dark:text-gray-300 text-gray-700 capitalize '>
              Store: <span>{ele.id_store}</span>
            </h2>
            <p
              className={`mb-2 text-md dark:text-gray-300  capitalize ${
                ele.qte > 0 ? "text-green-700" : "text-red-700 line-through"
              }`}
            >
              quantity in store: <span>{ele.qte}</span>
            </p>
          </div>
        ))}
      </div>
      <div className='flex gap-4 flex-wrap border w-full mt-8 flex-col'>
        <h2 className='text-2xl font-semibold text-gray-600 capitalize'>
          total of quantiry in all stores:{" "}
          <span className='text-green-700 font-semibold'>{total}</span>
        </h2>
        <h2 className='text-2xl font-semibold text-gray-600 capitalize'>
          price total of product in all stores:{" "}
          <span className='text-green-700 font-semibold'>
            {(total * product?.[0]?.price)?.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {" DZ"}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default ProductDetails;
