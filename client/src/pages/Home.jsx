import { useEffect, useRef, useState, createContext } from "react";
import Card from "../components/card/Card";
import HomeForm from "../components/home/HomeForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeContext = createContext();

const value = {};

const Home = () => {
  const url = "http://localhost:3000/api";
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [storesD, setStoresD] = useState([]);
  const [managers, setManagers] = useState([]);
  const [values, setValues] = useState({ name: "", id_manager: "" });
  const [errs, setErrs] = useState([]);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${url}/stores`, values)
      .then((res) => {
        setStores([...stores, res.data]);
        setValues({ name: "", id_manager: "" });
        inputRef.current.focus();
      })
      .catch((err) => setErrs([err.response.data.message]));
  };

  useEffect(() => {
    axios
      .get(`${url}/stores`)
      .then((res) => {
        setStoresD(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${url}/stores/details`)
      .then((res) => {
        setStoresD(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [stores]);

  useEffect(() => {
    axios
      .get(`${url}/employees/managers`)
      .then((res) => {
        setManagers(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const clickCard = (id) => {
    navigate(`stores/${id}`);
  };
  return (
    <HomeContext.Provider value={value}>
      <div>
        <h1 className='text-4xl font-bold uppercase mt-4 text-center text-blue-700 italic'>
          store products - project
        </h1>
        <div className='cards sotres flex gap-4 w-4/5 mx-auto mt-8 flex-wrap'>
          {storesD.map((store) => (
            <Card
              key={store.id}
              name={store.name}
              storeAdmin={store.name_manager}
              total_emp={store.total_emp}
              clickCard={() => clickCard(store.id)}
            />
          ))}
          <HomeForm
            values={values}
            setValues={setValues}
            handleSubmit={handleSubmit}
            inputRef={inputRef}
            errs={errs}
            managers={managers}
          />
          {/* <HomeManagers managers={managers} /> */}
        </div>
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
