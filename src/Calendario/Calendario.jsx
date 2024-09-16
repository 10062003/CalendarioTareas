import React, { useState } from "react";
import {
  format,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  isWithinInterval,
  parseISO,
} from "date-fns";

const CalendarTable = () => {
  const initialStartDate = startOfMonth(new Date());
  const [startDate, setStartDate] = useState(initialStartDate);

  const data = [
    {
      flujo: "Capacidad y Evolución Tecnológica - Habilitador",
      desarrollador: "Julián David Quintero",
      tareas: [
        {
          fechaInicio: "2024-09-03",
          fechaFin: "2024-09-18",
          codigo: "HUT 454",
          color: "yellow",
        },
        {
          fechaInicio: "2024-09-26",
          fechaFin: "2024-09-28",
          codigo: "HUT 706953",
          color: "yellow",
        },
        {
          fechaInicio: "2023-10-01",
          fechaFin: "2023-10-01",
          codigo: "HUT 415825",
          color: "green",
        },
      ],
    },
    {
      flujo: "Value Stream - Innovación y Desarrollo de Nuevos Productos",
      desarrollador: "Marco Antonio Celis",
      tareas: [
        {
          fechaInicio: "2024-09-01",
          fechaFin: "2024-09-20",
          codigo: "HUT 366076",
          color: "blue",
        },
        {
          fechaInicio: "2023-10-03",
          fechaFin: "2023-10-03",
          codigo: "HUT 402189",
          color: "red",
        },
      ],
    },
  ];

  const getDaysArray = () => {
    const daysInMonth = getDaysInMonth(startDate);
    return Array.from({ length: daysInMonth }, (_, i) => addDays(startDate, i));
  };

  const nextMonth = () => {
    setStartDate(addDays(endOfMonth(startDate), 1));
  };

  const previousMonth = () => {
    setStartDate(subDays(startOfMonth(startDate), 1));
  };

  const getMonthName = (date) => format(date, "MMMM yyyy");

  const getEventColor = (day, tareas) => {
    for (const tarea of tareas) {
      const { fechaInicio, fechaFin, color } = tarea;
      if (
        isWithinInterval(day, {
          start: parseISO(fechaInicio),
          end: parseISO(fechaFin),
        })
      ) {
        return color;
      }
    }
    return "transparent";
  };

  return (
    <div className="mx-5 overflow-hidden">
      <div className="mb-4 flex justify-center space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs"
          onClick={previousMonth}
        >
          ← Mes Anterior
        </button>
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs"
          onClick={nextMonth}
        >
          Mes Siguiente →
        </button>
      </div>

      <div className="overflow-x-auto relative">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th
                className="sticky left-0 bg-gray-100 z-10 border-b-2 border-gray-300"
                colSpan="2"
              ></th>
              <th
                colSpan={getDaysArray().length}
                className="bg-gray-200 font-bold text-sm"
              >
                {getMonthName(startDate)}
              </th>
            </tr>
            <tr>
              <th className="sticky left-0 bg-green-200 z-10 border-b-2 border-gray-300 text-xs font-semibold">
                Flujo de Valor
              </th>
              <th className="sticky left-[150px] bg-blue-200 z-10 border-b-2 border-gray-300 text-xs font-semibold">
                Desarrollador
              </th>
              {getDaysArray().map((day, index) => (
                <th
                  key={index}
                  className="bg-gray-300 text-xs font-semibold border-b-2 border-gray-300"
                  style={{ width: "2rem", height: "2rem" }} // Ajuste del tamaño
                >
                  {format(day, "dd")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-300">
                <td className="sticky left-0 bg-green-200 border-r-2 border-gray-300 text-xs">
                  {row.flujo}
                </td>
                <td className="sticky left-[150px] bg-blue-200 border-r-2 border-gray-300 text-xs">
                  {row.desarrollador}
                </td>
                {getDaysArray().map((day, dayIndex) => {
                  const backgroundColor = getEventColor(day, row.tareas);
                  return (
                    <td
                      key={dayIndex}
                      className="h-4 border border-gray-300 text-xs text-center"
                      style={{
                        backgroundColor: backgroundColor,
                      }}
                    >
                      {/* Optional: Add event code or any other content */}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarTable;
