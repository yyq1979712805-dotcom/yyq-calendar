# CustomCalendar 组件使用文档

## 目录

- [组件概述](#组件概述)
- [快速开始](#快速开始)
- [API 参考](#api-参考)
- [使用示例](#使用示例)
- [样式定制](#样式定制)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)
- [技术细节](#技术细节)

---

## 组件概述

CustomCalendar 是一个功能丰富的日历组件，专为展示赛事、活动等场景设计。

### 核心特性

| 特性 | 说明 |
|------|------|
| 🎨 自定义主题 | 荧光绿头部 + 深色日历面板，支持完全自定义样式 |
| 🌏 时区支持 | 默认使用北京时间（Asia/Shanghai），可配置其他时区 |
| 📅 当前日期标识 | 自动高亮当前日期，带荧光绿圆圈标识 |
| 🏷️ 事件徽章 | 在日期上显示多个彩色事件徽章 |
| 🖱️ 交互支持 | 事件徽章可点击，支持自定义点击处理 |
| 🌐 国际化 | 内置中文本地化，支持自定义语言 |
| 📱 固定布局 | 328px 宽度，高度自适应（最大 338px） |
| ⚡ 性能优化 | 基于 Ant Design，性能稳定可靠 |

### 技术栈

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "antd": "^6.1.3",
    "dayjs": "^1.11.19",
    "lucide-react": "^0.453.0"
  }
}
```

---

## 快速开始

### 1. 导入组件

```tsx
import { CustomCalendar } from '@/components/CustomCalendar';
```

### 2. 最简使用

```tsx
function App() {
  return <CustomCalendar />;
}
```

### 3. 带数据使用

```tsx
import { CustomCalendar, EventData } from '@/components/CustomCalendar';

function App() {
  const events: EventData = {
    "2025-12-25": [
      { text: "圣诞节", color: "bg-red-500", id: "christmas" }
    ]
  };

  return <CustomCalendar eventData={events} />;
}
```

---

## API 参考

### CustomCalendarProps

完整的组件属性接口：

```typescript
interface CustomCalendarProps {
  eventData?: EventData;
  defaultValue?: Dayjs | string;
  onEventClick?: (event: BadgeData, date: Dayjs) => void;
  ufoIconSrc?: string;
}
```

#### 属性详解

##### `eventData`
- **类型**: `EventData`
- **默认值**: `{}`
- **必填**: 否
- **说明**: 日历事件数据对象

**结构说明**：
```typescript
interface EventData {
  [key: string]: BadgeData[];  // key 格式: "YYYY-MM-DD"
}

interface BadgeData {
  text: string;      // 事件显示文本（建议 2-4 个字）
  color: string;     // Tailwind CSS 颜色类名
  id?: string;       // 唯一标识符，用于点击事件追踪
}
```

**示例**：
```typescript
const eventData: EventData = {
  "2025-12-09": [
    { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" },
    { text: "报名", color: "bg-[#bbfd3b]", id: "signup-1" }
  ],
  "2025-12-18": [
    { text: "复赛", color: "bg-blue-500", id: "semifinal-1" }
  ]
};
```

##### `defaultValue`
- **类型**: `Dayjs | string`
- **默认值**: `dayjs()` (当前日期)
- **必填**: 否
- **说明**: 日历初始显示的日期

**支持格式**：
```typescript
// 方式 1: 使用 dayjs 对象
<CustomCalendar defaultValue={dayjs("2025-12-01")} />

// 方式 2: 使用日期字符串
<CustomCalendar defaultValue="2025-12-01" />

// 方式 3: 使用当前日期（默认）
<CustomCalendar />
```

##### `onEventClick`
- **类型**: `(event: BadgeData, date: Dayjs) => void`
- **默认值**: `undefined`
- **必填**: 否
- **说明**: 事件徽章点击回调函数

**回调参数**：
- `event`: 被点击的事件对象
- `date`: 事件所在的日期（dayjs 对象）

**示例**：
```typescript
const handleEventClick = (event: BadgeData, date: Dayjs) => {
  console.log('事件信息:', {
    id: event.id,
    text: event.text,
    date: date.format("YYYY-MM-DD"),
    weekday: date.format("dddd")
  });

  // 跳转到详情页
  navigate(`/event/${event.id}`);

  // 或打开模态框
  setModalVisible(true);
};
```

##### `ufoIconSrc`
- **类型**: `string`
- **默认值**: `"/icon-ufo.png"`
- **必填**: 否
- **说明**: 日历头部装饰图标的路径

**注意事项**：
- 图标尺寸为 24×24px
- 图片应放在 `public` 目录下
- 支持 PNG、SVG、JPG 等格式

---

## 使用示例

### 示例 1: 基础日历

最简单的使用方式，不带任何事件数据。

```tsx
import { CustomCalendar } from '@/components/CustomCalendar';

export function BasicCalendar() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">本月日历</h2>
      <CustomCalendar />
    </div>
  );
}
```

### 示例 2: 赛事日历

展示比赛赛程的完整示例。

```tsx
import { CustomCalendar, EventData, BadgeData } from '@/components/CustomCalendar';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export function CompetitionCalendar() {
  const eventData: EventData = {
    "2025-11-30": [
      { text: "报名", color: "bg-[#bbfd3b]", id: "signup-1" }
    ],
    "2025-12-09": [
      { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" },
      { text: "报名", color: "bg-[#bbfd3b]", id: "signup-2" }
    ],
    "2025-12-18": [
      { text: "复赛", color: "bg-[#bbfd3b]", id: "semifinal-1" }
    ],
    "2025-12-22": [
      { text: "决赛", color: "bg-[#fb7a38]", id: "final-1" }
    ]
  };

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    alert(`${event.text} - ${date.format("YYYY年MM月DD日")}`);
  };

  return (
    <CustomCalendar
      eventData={eventData}
      onEventClick={handleEventClick}
      defaultValue={dayjs("2025-12-01")}
    />
  );
}
```

### 示例 3: 与路由集成

在实际应用中与 React Router 配合使用。

```tsx
import { CustomCalendar, EventData, BadgeData } from '@/components/CustomCalendar';
import { useNavigate } from 'react-router-dom';
import type { Dayjs } from 'dayjs';

export function EventCalendar() {
  const navigate = useNavigate();

  const eventData: EventData = {
    "2025-12-15": [
      { text: "会议", color: "bg-blue-500", id: "meeting-001" }
    ],
    "2025-12-20": [
      { text: "培训", color: "bg-green-500", id: "training-001" }
    ]
  };

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    // 跳转到事件详情页
    navigate(`/event/${event.id}`, {
      state: { date: date.format("YYYY-MM-DD") }
    });
  };

  return (
    <CustomCalendar
      eventData={eventData}
      onEventClick={handleEventClick}
    />
  );
}
```

### 示例 4: 动态加载数据

从 API 获取事件数据的异步示例。

```tsx
import { CustomCalendar, EventData } from '@/components/CustomCalendar';
import { useState, useEffect } from 'react';

export function DynamicCalendar() {
  const [eventData, setEventData] = useState<EventData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/calendar/events');
        const data = await response.json();

        // 转换 API 数据为组件所需格式
        const formattedData: EventData = {};
        data.forEach((event: any) => {
          const dateKey = event.date;
          if (!formattedData[dateKey]) {
            formattedData[dateKey] = [];
          }
          formattedData[dateKey].push({
            text: event.title,
            color: event.color || "bg-blue-500",
            id: event.id
          });
        });

        setEventData(formattedData);
      } catch (error) {
        console.error('获取日历数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center p-8">加载中...</div>;
  }

  return <CustomCalendar eventData={eventData} />;
}
```

### 示例 5: 模态框交互

点击事件后打开详情模态框。

```tsx
import { CustomCalendar, EventData, BadgeData } from '@/components/CustomCalendar';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';

export function ModalCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<{
    event: BadgeData;
    date: string;
  } | null>(null);

  const eventData: EventData = {
    "2025-12-10": [
      { text: "发布会", color: "bg-purple-500", id: "launch-001" }
    ]
  };

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    setSelectedEvent({
      event,
      date: date.format("YYYY-MM-DD")
    });
  };

  return (
    <>
      <CustomCalendar
        eventData={eventData}
        onEventClick={handleEventClick}
      />

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">
              {selectedEvent.event.text}
            </h3>
            <p className="text-gray-600 mb-4">
              日期: {selectedEvent.date}
            </p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
```

### 示例 6: 多颜色标签

使用不同颜色区分事件类型。

```tsx
import { CustomCalendar, EventData } from '@/components/CustomCalendar';

export function ColorfulCalendar() {
  const eventData: EventData = {
    "2025-12-01": [
      { text: "紧急", color: "bg-red-500", id: "urgent-1" }
    ],
    "2025-12-05": [
      { text: "重要", color: "bg-orange-500", id: "important-1" }
    ],
    "2025-12-10": [
      { text: "普通", color: "bg-blue-500", id: "normal-1" }
    ],
    "2025-12-15": [
      { text: "低优先级", color: "bg-gray-400", id: "low-1" }
    ]
  };

  return <CustomCalendar eventData={eventData} />;
}
```

### 示例 7: 状态管理集成

与 Redux/Zustand 等状态管理工具配合。

```tsx
import { CustomCalendar, BadgeData } from '@/components/CustomCalendar';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSelectedEvent } from '@/store/calendarSlice';
import type { Dayjs } from 'dayjs';

export function StateManagementCalendar() {
  const dispatch = useAppDispatch();
  const eventData = useAppSelector(state => state.calendar.events);

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    dispatch(setSelectedEvent({
      eventId: event.id,
      date: date.format("YYYY-MM-DD")
    }));
  };

  return (
    <CustomCalendar
      eventData={eventData}
      onEventClick={handleEventClick}
    />
  );
}
```

---

## 样式定制

### 修改主题颜色

#### 方式 1: 修改 CSS 文件

编辑 `calendar-custom.css` 文件：

```css
/* 修改头部背景色 */
.calendar-container {
  background: #your-primary-color;
}

.calendar-header {
  background: #your-primary-color;
}

/* 修改当前日期标识颜色 */
.current-date-circle {
  background: #your-accent-color;
  color: #your-text-color;
}

/* 修改日历主体背景色 */
.calendar-container .ant-picker-content,
.calendar-container .ant-picker-cell {
  background: #your-dark-color;
}

/* 修改文字颜色 */
.calendar-container .ant-picker-cell-in-view {
  color: #your-text-color;
}
```

#### 方式 2: 使用 CSS 变量

在父组件中定义 CSS 变量：

```tsx
<div style={{
  '--calendar-primary': '#bbfd3b',
  '--calendar-dark': '#333333',
  '--calendar-accent': '#fb7a38'
}}>
  <CustomCalendar />
</div>
```

### 修改尺寸

```css
/* 修改日历宽度 */
.calendar-container {
  width: 400px;  /* 默认 328px */
  max-height: 450px;  /* 默认 338px */
}

/* 相应调整单元格宽度 */
.calendar-container .ant-picker-cell {
  width: calc(400px / 7);
}
```

### 自定义事件徽章样式

```css
/* 修改徽章圆角 */
.event-badge {
  border-radius: 4px;  /* 默认 20px */
}

/* 修改徽章大小 */
.event-badge {
  width: 50px;  /* 默认 40px */
  height: 16px;  /* 默认 12px */
  font-size: 10px;  /* 默认 8px */
}

/* 添加徽章阴影 */
.event-badge {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### 完整主题示例

```css
/* 蓝色主题 */
.calendar-container.theme-blue {
  background: #3b82f6;
}

.calendar-container.theme-blue .calendar-header {
  background: #3b82f6;
}

.calendar-container.theme-blue .current-date-circle {
  background: #60a5fa;
}

.calendar-container.theme-blue .ant-picker-content {
  background: #1e293b;
}
```

使用主题：

```tsx
<div className="theme-blue">
  <CustomCalendar />
</div>
```

---

## 最佳实践

### 1. 事件数据管理

**推荐做法**：
```typescript
// 将事件数据与组件分离
const EVENT_CONFIG: EventData = {
  "2025-12-09": [
    { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" }
  ]
};

// 定义颜色常量
const EVENT_COLORS = {
  primary: "bg-[#bbfd3b]",
  warning: "bg-[#fb7a38]",
  info: "bg-blue-500"
};
```

### 2. 性能优化

**使用 useMemo 缓存事件数据**：
```typescript
const eventData = useMemo(() => ({
  "2025-12-09": [
    { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" }
  ]
}), []);
```

**使用 useCallback 缓存事件处理函数**：
```typescript
const handleEventClick = useCallback((event: BadgeData, date: Dayjs) => {
  navigate(`/event/${event.id}`);
}, [navigate]);
```

### 3. 错误处理

```typescript
const handleEventClick = (event: BadgeData, date: Dayjs) => {
  try {
    if (!event.id) {
      console.warn('事件缺少 ID');
      return;
    }
    navigate(`/event/${event.id}`);
  } catch (error) {
    console.error('事件处理失败:', error);
    toast.error('无法打开事件详情');
  }
};
```

### 4. 类型安全

```typescript
// 定义严格的事件类型
type EventType = 'signup' | 'preliminary' | 'semifinal' | 'final';

interface TypedBadgeData extends BadgeData {
  type: EventType;
}

// 使用类型守卫
function isValidEvent(event: any): event is TypedBadgeData {
  return event.id && event.text && event.color && event.type;
}
```

### 5. 响应式设计

```tsx
import { useMediaQuery } from '@/hooks/useMediaQuery';

function ResponsiveCalendar() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={isMobile ? 'scale-90' : ''}>
      <CustomCalendar />
    </div>
  );
}
```

---

## 常见问题

### Q1: 如何让日历显示当前月份？

**A**: 不传 `defaultValue` 即可，组件会自动显示当前月份。

```tsx
<CustomCalendar />
```

### Q2: 一个日期可以显示多少个事件？

**A**: 建议最多 2 个，超过会被隐藏（受 CSS 高度限制）。

```typescript
// 正常显示
"2025-12-09": [
  { text: "初赛", color: "bg-[#fb7a38]" },
  { text: "报名", color: "bg-[#bbfd3b]" }
]

// 第三个会被隐藏
"2025-12-09": [
  { text: "事件1", color: "bg-red-500" },
  { text: "事件2", color: "bg-blue-500" },
  { text: "事件3", color: "bg-green-500" }  // 不可见
]
```

### Q3: 如何修改日历语言？

**A**: 组件使用中文本地化，修改需要调整 `CustomCalendar.tsx`:

```typescript
// 修改为英文
const customLocale = {
  ...enUS,
  lang: {
    ...enUS.lang,
    shortWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};
```

### Q4: 当前日期圆圈不显示怎么办？

**A**: 检查以下几点：
1. 确认系统时区设置
2. 组件使用北京时间，如需更改：

```typescript
// 修改时区
const today = dayjs().tz("America/New_York");
```

### Q5: 如何获取用户选择的日期？

**A**: 使用 `onEventClick` 回调：

```typescript
const handleEventClick = (event: BadgeData, date: Dayjs) => {
  console.log('选中日期:', date.format("YYYY-MM-DD"));
};
```

### Q6: 事件颜色不显示？

**A**: 确保使用 Tailwind CSS 类名，并且已配置 Tailwind:

```typescript
// ✅ 正确
{ color: "bg-blue-500" }

// ❌ 错误
{ color: "blue" }
{ color: "#3b82f6" }
```

### Q7: 如何禁用某些日期？

**A**: 组件不直接支持禁用，但可以通过事件处理实现：

```typescript
const handleEventClick = (event: BadgeData, date: Dayjs) => {
  if (date.isBefore(dayjs(), 'day')) {
    alert('过去的日期不可选择');
    return;
  }
  // 处理逻辑
};
```

### Q8: 能否在日期单元格显示自定义内容？

**A**: 当前版本不支持，只能显示事件徽章。如需深度定制，可修改 `CustomCalendar.tsx` 中的 `fullCellRender` 函数。

---

## 技术细节

### 时区处理机制

组件使用 dayjs 的 timezone 插件：

```typescript
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// 获取北京时间
const today = dayjs().tz("Asia/Shanghai");
```

### 样式隔离

所有样式通过 `.calendar-container` 前缀限定作用域，不会影响全局样式。

### 事件冒泡处理

事件徽章点击时阻止冒泡：

```typescript
onClick={(e) => {
  e.stopPropagation();  // 阻止冒泡到日期单元格
  handleEventClick(event, date);
}}
```

### 性能考虑

- 使用 Ant Design 的虚拟滚动优化渲染性能
- 事件数据通过引用比较避免不必要的重渲染
- CSS 使用 GPU 加速的 transform 属性

### 浏览器兼容性

| 浏览器 | 最低版本 | 说明 |
|--------|---------|------|
| Chrome | 90+ | 完全支持 |
| Firefox | 88+ | 完全支持 |
| Safari | 14+ | 完全支持 |
| Edge | 90+ | 完全支持 |
| IE | ❌ | 不支持 |

---

## 文件结构

```
CustomCalendar/
├── CustomCalendar.tsx      # 主组件
├── calendar-custom.css     # 样式文件
├── index.ts               # 导出文件
├── README.md              # 简明文档
├── USAGE.md               # 本文档
└── example.tsx            # 示例代码
```

---

## 版本历史

### v1.0.0 (2025-01-05)
- ✨ 初始版本发布
- ✅ 支持事件展示和点击
- ✅ 北京时间同步
- ✅ 完整的 TypeScript 类型支持
- ✅ 8 个使用示例
- ✅ 完整文档

---

## 技术支持

遇到问题或有建议？请联系开发团队。

**相关文档**：
- [README.md](./README.md) - 快速入门
- [example.tsx](./example.tsx) - 代码示例
- [Ant Design 日历组件](https://ant.design/components/calendar-cn/)
- [Day.js 文档](https://dayjs.gitee.io/zh-CN/)
