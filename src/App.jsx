import { useState } from "react";
import CalendarTable from "./Calendario/Calendario";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <CalendarTable />
      </div>
    </>
  );
}

export default App;
