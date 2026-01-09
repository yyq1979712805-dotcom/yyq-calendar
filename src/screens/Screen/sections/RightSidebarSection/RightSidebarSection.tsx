import { CustomCalendar, BadgeData, EventData } from "../../../../components/CustomCalendar";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const eventData: EventData = {
  "2025-11-30": [{ text: "报名", color: "bg-[#bbfd3b]", id: "signup-1" }],
  "2025-12-09": [
    { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" },
    { text: "报名", color: "bg-[#bbfd3b]", id: "signup-2" },
  ],
  "2025-12-10": [{ text: "初赛", color: "bg-[#bbfd3b]", id: "preliminary-2" }],
  "2025-12-18": [{ text: "复赛", color: "bg-[#bbfd3b]", id: "semifinal-1" }],
  "2025-12-22": [{ text: "决赛", color: "bg-[#fb7a38]", id: "final-1" }],
};

export const RightSidebarSection = (): JSX.Element => {
  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    console.log('Event clicked:', {
      eventId: event.id,
      eventText: event.text,
      date: date.format("YYYY-MM-DD")
    });
  };

  return (
    <CustomCalendar
      eventData={eventData}
      onEventClick={handleEventClick}
      defaultValue={dayjs("2025-12-01")}
    />
  );
};
