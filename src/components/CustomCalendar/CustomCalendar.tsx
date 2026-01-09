import { Calendar } from "antd";
import locale from "antd/es/calendar/locale/zh_CN";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import "./calendar-custom.css";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("zh-cn");

const customLocale = {
  ...locale,
  lang: {
    ...locale.lang,
    shortWeekDays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  },
};

export interface BadgeData {
  text: string;
  color: string;
  id?: string;
}

export interface EventData {
  [key: string]: BadgeData[];
}

export interface CustomCalendarProps {
  eventData?: EventData;
  defaultValue?: Dayjs | string;
  onEventClick?: (event: BadgeData, date: Dayjs) => void;
  ufoIconSrc?: string;
}

export const CustomCalendar = ({
  eventData = {},
  defaultValue,
  onEventClick,
  ufoIconSrc = "/icon-ufo.png",
}: CustomCalendarProps): JSX.Element => {
  const getEventForDate = (date: Dayjs): BadgeData[] => {
    const dateStr = date.format("YYYY-MM-DD");
    return eventData[dateStr] || [];
  };

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    if (onEventClick) {
      onEventClick(event, date);
    } else {
      console.log("Event clicked:", {
        eventId: event.id,
        eventText: event.text,
        date: date.format("YYYY-MM-DD"),
      });
    }
  };

  const fullCellRender = (date: Dayjs) => {
    const events = getEventForDate(date);
    const today = dayjs().tz("Asia/Shanghai");
    const isToday =
      date.year() === today.year() &&
      date.month() === today.month() &&
      date.date() === today.date();

    return (
      <div className="calendar-date-cell">
        {isToday ? (
          <div className="current-date-circle">{date.date()}</div>
        ) : (
          <div>{date.date()}</div>
        )}
        <div className="date-content">
          {events.map((event, index) => (
            <Badge
              key={index}
              className={`event-badge ${event.color} hover:${event.color}`}
              onClick={(e) => {
                e.stopPropagation();
                handleEventClick(event, date);
              }}
            >
              <span className="event-text">{event.text}</span>
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  const headerRender = ({ value, onChange }: any) => {
    const month = value.month();
    const year = value.year();

    const goToPrevMonth = () => {
      const newDate = value.clone().month(month - 1);
      onChange(newDate);
    };

    const goToNextMonth = () => {
      const newDate = value.clone().month(month + 1);
      onChange(newDate);
    };

    return (
      <div className="calendar-header">
        <div className="header-content">
          <Button
            variant="ghost"
            size="icon"
            className="nav-button"
            onClick={goToPrevMonth}
          >
            <ChevronLeftIcon className="w-4 h-4 text-[#00000e]" />
          </Button>

          <div className="month-year-text">
            {year}年{month + 1}月
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="nav-button"
            onClick={goToNextMonth}
          >
            <ChevronRightIcon className="w-4 h-4 text-[#00000e]" />
          </Button>
        </div>

        <div className="header-icon">
          <img className="icon-img" alt="UFO" src={ufoIconSrc} />
        </div>
      </div>
    );
  };

  const calendarDefaultValue = defaultValue
    ? typeof defaultValue === "string"
      ? dayjs(defaultValue)
      : defaultValue
    : dayjs();

  return (
    <section className="calendar-container">
      <Calendar
        fullscreen={false}
        fullCellRender={fullCellRender}
        headerRender={headerRender}
        defaultValue={calendarDefaultValue}
        locale={customLocale}
      />
    </section>
  );
};
