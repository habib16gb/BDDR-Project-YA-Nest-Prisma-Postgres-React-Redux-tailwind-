import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='p-4 bg-slate-200 flex items-center justify-between'>
      <div>
        <Link className='uppercase italic font-bold text-blue-600' to={"/"}>
          logo
        </Link>
      </div>
      <nav>
        <ul className='flex gap-4 items-center justify-center'>
          {[
            { path: "/home", page: "home" },
            { path: "/employees", page: "employees" },
            { path: "/stores", page: "stores" },
            { path: "/products", page: "product" },
            { path: "/categories", page: "category" },
            { path: "/store_products", page: "store_products" },
          ].map(({ path, page }, index) => (
            <li key={index}>
              <Link
                className='capitalize text-blue-600 hover:underline'
                to={path}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
