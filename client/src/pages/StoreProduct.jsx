import { useEffect, useState, useRef } from "react";
import Table from "../components/Table";
import axios from "axios";
import Form from "../components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import date from "date-and-time";
// import { useNavigate } from "react-router-dom";

const now = new Date();

const StoreProduct = () => {
  const idRef = useRef(null);
  const idStoreRef = useRef(null);
  const idProductRef = useRef(null);
  const qteRef = useRef(null);
  const ths = [
    { label: "id", type: "number", ref: idRef, hidden: true, value: "" },

    {
      label: "id_store",
      type: "number",
      ref: idStoreRef,
      hidden: false,
      value: "",
    },
    {
      label: "id_product",
      type: "number",
      ref: idProductRef,
      hidden: false,
      value: "",
    },
    {
      label: "qte",
      type: "number",
      ref: qteRef,
      hidden: false,
      value: 0,
    },
  ];

  const [emp, setEmp] = useState([]);
  const [err, setErr] = useState(false);
  const [errsMsg, setErrsMsg] = useState([]);
  const [values, setValues] = useState({
    id_store: "",
    id_product: "",
    qte: 0,
    createdAt: date.format(now, "YYYY/MM/DD HH:mm:ss"),
  });

  const reset = () => {
    idStoreRef.current.value = "";
    idProductRef.current.value = "";
    qteRef.current.value = 0;
    idStoreRef.current.focus();
    setValues({ ...values, qte: 0 });
  };

  const toastSuccess = (message) => {
    toast.success(message);
    <ToastContainer />;
  };

  const url = "http://localhost:3000/api/store_products";

  const handleEdit = (id) => {
    const storeProduct = axios.get(`${url}/${id}`);
    storeProduct
      .then((res) => {
        setValues({ ...res.data });
        idStoreRef.value = res.data?.id_store;
        idProductRef.value = res.data?.id_product;
        qteRef.value = res.data?.qte;
      })
      .catch((err) => {
        setErrsMsg([err.response.data.message]);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then((res) => {
        setEmp(emp.filter((ele) => ele.id !== id));
        setErrsMsg([]);
        console.log(res);
      })
      .catch((err) => {
        setErrsMsg([err.response.data.message]);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(url, values)
      .then((res) => {
        setEmp([...emp, res.data[0]]);
        setErr(false);
        setErrsMsg([]);
        reset();
        toastSuccess("add success");
      })
      .catch((err) => {
        console.log(err);
        setErrsMsg([err.response.data.message]);
      });
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setEmp(res.data);
      })
      .catch((err) => {
        setErr(true);
        console.error(err.message);
      });
  }, []);

  return (
    <div className='mt-4 px-8'>
      <h1 className='font-bold uppercase text-blue-600 text-2xl italic text-center mb-4'>
        StoreProduct List
      </h1>
      <div className='flex gap-6'>
        <Table
          dataTable={emp}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          ths={ths}
          err={err}
          setErr={setErr}
        />
        <Form
          ths={ths}
          handleSubmit={handleSubmit}
          err={err}
          values={values}
          setValues={setValues}
          errsMsg={errsMsg}
          setErrsMsg={setErrsMsg}
        />
      </div>
    </div>
  );
};

export default StoreProduct;
