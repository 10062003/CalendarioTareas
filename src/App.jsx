import { useState } from "react";
import CalendarTable from "./Calendario/Calendario";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <>
      <div className="pb-2 relative">
        <Navbar />
        <h1 className="pt-5 text-center text-4xl font-bold">Calendario</h1>
        <div className="pt-4 relative z-[1]">
          <CalendarTable />
        </div>
      </div>
    </>
  );
}

export default App;
