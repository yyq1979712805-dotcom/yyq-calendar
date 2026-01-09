/**
 * CustomCalendar 组件使用示例
 *
 * 这个文件展示了如何在不同场景下使用 CustomCalendar 组件
 */

import { CustomCalendar, BadgeData, EventData } from './CustomCalendar';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

// ==================== 示例 1: 基础用法 ====================
export function BasicExample() {
  return <CustomCalendar />;
}

// ==================== 示例 2: 带事件数据 ====================
export function EventExample() {
  const eventData: EventData = {
    "2025-12-09": [
      { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" },
      { text: "报名", color: "bg-[#bbfd3b]", id: "signup-2" },
    ],
    "2025-12-18": [
      { text: "复赛", color: "bg-[#bbfd3b]", id: "semifinal-1" }
    ],
    "2025-12-22": [
      { text: "决赛", color: "bg-[#fb7a38]", id: "final-1" }
    ]
  };

  return (
    <CustomCalendar
      eventData={eventData}
      defaultValue={dayjs("2025-12-01")}
    />
  );
}

// ==================== 示例 3: 事件点击处理 ====================
export function EventClickExample() {
  const eventData: EventData = {
    "2025-12-09": [
      { text: "会议", color: "bg-[#fb7a38]", id: "meeting-1" }
    ]
  };

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    alert(`点击了事件: ${event.text}\n日期: ${date.format("YYYY-MM-DD")}`);
    // 或者跳转到详情页
    // window.location.href = `/event/${event.id}`;
  };

  return (
    <CustomCalendar
      eventData={eventData}
      onEventClick={handleEventClick}
    />
  );
}

// ==================== 示例 4: 自定义图标 ====================
export function CustomIconExample() {
  return (
    <CustomCalendar
      ufoIconSrc="/custom-icon.png"
    />
  );
}

// ==================== 示例 5: 与 React Router 集成 ====================
// import { useNavigate } from 'react-router-dom';

export function RouterIntegrationExample() {
  // const navigate = useNavigate();

  const eventData: EventData = {
    "2025-12-09": [
      { text: "详情", color: "bg-[#fb7a38]", id: "event-123" }
    ]
  };

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    // 使用 React Router 导航
    // navigate(`/event/${event.id}`);
    console.log('Navigate to:', `/event/${event.id}`);
  };

  return (
    <CustomCalendar
      eventData={eventData}
      onEventClick={handleEventClick}
    />
  );
}

// ==================== 示例 6: 动态事件数据（从 API 获取）====================
import { useState, useEffect } from 'react';

export function DynamicDataExample() {
  const [eventData, setEventData] = useState<EventData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟从 API 获取数据
    const fetchEvents = async () => {
      try {
        // const response = await fetch('/api/events');
        // const data = await response.json();

        // 模拟数据
        const mockData: EventData = {
          "2025-12-15": [
            { text: "API事件", color: "bg-[#fb7a38]", id: "api-event-1" }
          ]
        };

        setEventData(mockData);
      } catch (error) {
        console.error('获取事件数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  return <CustomCalendar eventData={eventData} />;
}

// ==================== 示例 7: 多颜色事件标签 ====================
export function MultiColorExample() {
  const eventData: EventData = {
    "2025-12-10": [
      { text: "重要", color: "bg-red-500", id: "important-1" }
    ],
    "2025-12-11": [
      { text: "信息", color: "bg-blue-500", id: "info-1" }
    ],
    "2025-12-12": [
      { text: "成功", color: "bg-green-500", id: "success-1" }
    ],
    "2025-12-13": [
      { text: "警告", color: "bg-yellow-500", id: "warning-1" }
    ],
    "2025-12-14": [
      { text: "主题", color: "bg-[#bbfd3b]", id: "theme-1" }
    ]
  };

  return <CustomCalendar eventData={eventData} />;
}

// ==================== 示例 8: 完整应用示例 ====================
export function CompleteExample() {
  const [eventData] = useState<EventData>({
    "2025-11-30": [{ text: "报名", color: "bg-[#bbfd3b]", id: "signup-1" }],
    "2025-12-09": [
      { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" },
      { text: "报名", color: "bg-[#bbfd3b]", id: "signup-2" },
    ],
    "2025-12-10": [{ text: "初赛", color: "bg-[#bbfd3b]", id: "preliminary-2" }],
    "2025-12-18": [{ text: "复赛", color: "bg-[#bbfd3b]", id: "semifinal-1" }],
    "2025-12-22": [{ text: "决赛", color: "bg-[#fb7a38]", id: "final-1" }],
  });

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    console.log('事件详情:', {
      id: event.id,
      text: event.text,
      date: date.format("YYYY-MM-DD"),
      dayOfWeek: date.format("dddd")
    });

    // 这里可以打开模态框、跳转页面等
    // 例如：打开事件详情模态框
    // setSelectedEvent(event);
    // setModalOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">赛事日历</h1>
      <CustomCalendar
        eventData={eventData}
        onEventClick={handleEventClick}
        defaultValue={dayjs("2025-12-01")}
        ufoIconSrc="/icon-ufo.png"
      />
    </div>
  );
}
