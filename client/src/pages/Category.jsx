import { useEffect, useState, useRef } from "react";
import Table from "../components/Table";
import axios from "axios";
import Form from "../components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

const Employees = () => {
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const id_managerRef = useRef(null);
  const ths = [
    { label: "id", type: "number", ref: idRef, hidden: true, value: "" },
    { label: "name", type: "text", ref: nameRef, hidden: false, value: "" },
  ];

  const [emp, setEmp] = useState([]);
  const [err, setErr] = useState(false);
  const [errsMsg, setErrsMsg] = useState([]);
  const [values, setValues] = useState({
    name: "",
    id_manager: null,
  });

  const reset = () => {
    nameRef.current.value = "";
    id_managerRef.current.value = null;
    nameRef.current.focus();
  };

  const toastSuccess = (message) => {
    toast.success(message);
    <ToastContainer />;
  };

  const url = "http://localhost:3000/api/categories";

  const handleEdit = (id) => {
    const employee = axios.get(`${url}/${id}`);
    employee
      .then((res) => {
        console.log(res.data);
        setValues({ ...res.data });
        nameRef.value = res.data?.name;
        id_managerRef.value = res.data?.id_manager;
      })
      .catch((err) => console.error(err));
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
        setErrsMsg([err.response]);
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
        Employees List
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

export default Employees;
