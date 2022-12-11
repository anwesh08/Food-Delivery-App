import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
  ;
import { AnimatePresence } from "framer-motion";

import CreateContainer from "./Components/CreateContainer";
import Header from "./Components/Header";
import MainContainer from "./Components/MainContainer";
import { useStateValue } from "./Context/StateProvider";

import { getAllFoodItems } from "./Utils/firebaseFunctions";
import { actionType } from "./Context/reducer";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AnimatePresence mode="wait">
      <div className="h-auto w-screen flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
