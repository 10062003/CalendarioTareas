import React, { useState } from "react";
import {
  format,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  parseISO,
} from "date-fns";
import CardUser from "../CardUser/CardUser";

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
          color: "#fef08a",
        },
        {
          fechaInicio: "2024-09-19",
          fechaFin: "2024-10-05",
          codigo: "HUT 706953",
          color: "#fef08a",
        },
        {
          fechaInicio: "2023-10-01",
          fechaFin: "2023-10-01",
          codigo: "HUT 415825",
          color: "#fef08a",
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
          color: "#fef08a",
        },
        {
          fechaInicio: "2023-10-03",
          fechaFin: "2023-10-03",
          codigo: "HUT 402189",
          color: "#fef08a",
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

  const getEventDetails = (tareas) => {
    const monthStart = startOfMonth(startDate);
    const monthEnd = endOfMonth(startDate);

    return tareas.flatMap((tarea) => {
      const { fechaInicio, fechaFin, color, codigo } = tarea;
      const start = parseISO(fechaInicio);
      const end = parseISO(fechaFin);

      if (end < monthStart || start > monthEnd) return [];

      const adjustedStart = start > monthStart ? start : monthStart;
      const adjustedEnd = end < monthEnd ? end : monthEnd;

      return [
        {
          start: adjustedStart,
          end: adjustedEnd,
          color,
          codigo,
        },
      ];
    });
  };

  const renderEventBlock = (event, dayIndex) => {
    const { start, end, color, codigo } = event;
    const startDay = start.getDate();
    const endDay = end.getDate();
    const colSpan = endDay - startDay + 1;

    if (dayIndex + 1 === startDay) {
      return (
        <td
          key={codigo}
          colSpan={Math.min(colSpan, getDaysArray().length - dayIndex)}
          className="relative text-xs text-center"
          style={{ backgroundColor: "transparent" }}
        >
          <div
            className="p-1 mx-1 rounded-md shadow-sm"
            style={{
              backgroundColor: color,
              color: "black",
              fontSize: "0.7rem",
            }}
          >
            {codigo}
          </div>
        </td>
      );
    }
    return null;
  };

  return (
    <div className="mx-2 sm:mx-5 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th
              className="bg-gray-100 border-b-2 border-gray-300 text-center"
              colSpan="2"
            ></th>
            <th
              colSpan={getDaysArray().length + 2}
              className="bg-gray-200 font-bold text-sm text-center"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={previousMonth}
                  className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 rounded-full"
                >
                  &lt;
                </button>
                <span>{getMonthName(startDate)}</span>
                <button
                  onClick={nextMonth}
                  className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 rounded-full"
                >
                  &gt;
                </button>
              </div>
            </th>
          </tr>
          <tr>
            <th
              className="bg-orange-300 border-b-2 border-gray-300 text-xs font-semibold text-center"
              style={{ minWidth: "200px" }}
            >
              Flujo de Valor
            </th>
            <th
              className="bg-blue-300 border-b-2 border-gray-300 text-xs font-semibold text-center"
              style={{ minWidth: "150px" }}
            >
              Desarrollador
            </th>
            {getDaysArray().map((day, index) => (
              <th
                key={index}
                className="bg-gray-300 text-xs font-semibold border-b-2 border-gray-300 text-center"
                style={{ width: "2rem", height: "2rem" }}
              >
                {format(day, "dd")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const eventDetails = getEventDetails(row.tareas);

            return (
              <tr key={rowIndex} className="border-b border-gray-300">
                <td
                  className="p-2 border-r-2 border-gray-300 text-xs whitespace-nowrap bg-white"
                  style={{ minWidth: "200px" }}
                >
                  {row.flujo}
                </td>
                <td
                  className="p-2 border-r-2 border-gray-300 text-xs whitespace-nowrap bg-white"
                  style={{ minWidth: "150px" }}
                >
                  {row.desarrollador}
                </td>
                {getDaysArray().map((day, dayIndex) => {
                  const eventOnThisDay = eventDetails.find(
                    (event) =>
                      dayIndex + 1 >= event.start.getDate() &&
                      dayIndex + 1 <= event.end.getDate()
                  );

                  if (eventOnThisDay) {
                    return renderEventBlock(eventOnThisDay, dayIndex);
                  }
                  return (
                    <td
                      key={dayIndex}
                      className="border border-gray-300"
                      style={{ backgroundColor: "transparent" }}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarTable;
