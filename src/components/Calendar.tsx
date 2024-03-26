import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { EventContentArg } from "@fullcalendar/core";
import "../calendar.css";
import { Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
interface CalendarProps {
  monthlyTransactions:Transaction[]
}

const Calendar = ({ monthlyTransactions }:CalendarProps) => {
  const events = [
    {
      title: "Meeting",
      start: "2024-03-25",
      income: 500,
      expense: 500,
      balance: 200,
    },
    {
      title: "Meeting",
      start: "2024-03-24",
      income: 500,
      expense: 500,
      balance: 200,
    },
  ];

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  const dailyCalances = calculateDailyBalances(monthlyTransactions);
  
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
