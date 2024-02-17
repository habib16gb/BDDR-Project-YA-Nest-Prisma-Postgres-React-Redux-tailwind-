import { useEffect, useState, useRef } from "react";
import Table from "../components/Table";
import axios from "axios";
import Form from "../components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

const Products = () => {
  const idRef = useRef(null);
  const designationRef = useRef(null);
  const priceRef = useRef(null);
  const etatRef = useRef(null);
  const idCategory = useRef(null);
  const createdAtRef = useRef(null);
  const updatedAtRef = useRef(null);
  const ths = [
    { label: "id", type: "number", ref: idRef, hidden: true, value: "" },

    {
      label: "designation",
      type: "text",
      ref: designationRef,
      hidden: false,
      value: "",
    },
    {
      label: "price",
      type: "number",
      ref: priceRef,
      hidden: false,
      value: null,
    },
    {
      label: "id_category",
      type: "number",
      ref: idCategory,
      hidden: false,
      value: "",
    },
    {
      label: "etat",
      type: "text",
      ref: etatRef,
      hidden: false,
      value: "DESACTIVE",
    },
    {
      label: "createdAt",
      type: "text",
      ref: createdAtRef,
      hidden: false,
      value: "",
    },
    {
      label: "updatedAt",
      type: "text",
      ref: updatedAtRef,
      hidden: false,
      value: "",
    },
  ];

  const [emp, setEmp] = useState([]);
  const [err, setErr] = useState(false);
  const [errsMsg, setErrsMsg] = useState([]);
  const [values, setValues] = useState({
    designation: "",
    price: "",
    idCategory: "",
    etat: "DESACTIVE",
    createdAt: "",
    updatedAt: "",
  });

  const reset = () => {
    designationRef.current.value = "";
    priceRef.current.value = "";
    designationRef.current.focus();
    idCategory.current.value = "";
    createdAtRef.current.value = "";
    updatedAtRef.current.value = "";
  };

  const toastSuccess = (message) => {
    toast.success(message);
    <ToastContainer />;
  };

  const url = "http://localhost:3000/api/products";

  const handleEdit = (id) => {
    const employee = axios.get(`${url}/${id}`);
    employee
      .then((res) => {
        console.log(res.data);
        setValues({ ...res.data });
        designationRef.value = res.data?.name;
        priceRef.value = res.data?.id_manager;
      })
      .catch((err) => {
        setErrsMsg([err.response.data.message]);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        setEmp(emp.filter((ele) => ele.id !== id));
        setErrsMsg([]);
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
        setEmp([...emp, res.data]);
        setErr(false);
        setErrsMsg([]);
        reset();
        toastSuccess("add success");
      })
      .catch((err) => {
        setErrsMsg([err.response.data.message]);
      });
  };
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        {
          setEmp(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        setErr(true);
        console.error(err.message);
      });
  }, []);
  console.log(emp);
  return (
    <div className='mt-4 px-8'>
      <h1 className='font-bold uppercase text-blue-600 text-2xl italic text-center mb-4'>
        Products List
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

export default Products;
