import { useState, useEffect } from "react";
import Cards from "../src/components/Cards";
import data from "../src/data/data";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [tHour, setTRHour] = useState(0);
  const [rHour, setRHour] = useState(20);
  const [prices, setPrices] = useState(0);
  const [selectC, setSelectC] = useState([]);

  function handleSelect(id, title, price, credit) {
    const rId = selectC.find((it) => it.id === id);

    if (rId) {
      toast.error(`You are already add this Course`)
    } else if (rHour < credit) {
      toast.error(`Your ${rHour} Credit Remaining `)
    } else {
      setSelectC([...selectC, { id, title, price, credit }]);

      setPrices(prices + price);
      setTRHour(tHour + credit);
      setRHour(rHour - credit);
    }
  }

  const cardFunctionality = () => {};

  cardFunctionality();

  useEffect(() => {
    document.title = 'Course Registration';
  }, []);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="text-center text-4xl font-medium mt-10">
        Course Registration
      </h1>
      <div className="mt-12 flex-row justify-center  md:flex md:justify-evenly">
        <div className="grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 md:grid-cols-3">
          {data.map((items, index) => (
            <Cards key={index} Cdata={items} handleSelect={handleSelect} />
          ))}
        </div>
        <div className="">
          <div className="w-80 min-h-[24rem] flex flex-col justify-between bg-white border shadow-sm rounded-xl p-5">
            <div className="">
              <h1 className="p-4 font-bold text-blue-800">
                Credit Hour Remaining {rHour} hr
              </h1>
              <hr />
              <h1 className="p-5 font-bold text-[20px]">Course Name</h1>
            </div>

            <div className="course_div pb-5">
              {selectC.map((items, index) => (
                <p key={index}>{items.title}</p>
              ))}
            </div>

            <div className="">
              <hr />
              <p className="p-4">Total Credit Hour : {tHour}</p>
              <hr />
              <p className="p-4 font-medium">Total Price : {prices} USD</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
