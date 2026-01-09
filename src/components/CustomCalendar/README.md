# CustomCalendar 组件

一个基于 Ant Design 的自定义日历组件，支持事件展示、主题定制和北京时间同步。

## 功能特性

- 🎨 完全自定义的视觉样式（荧光绿头部 + 深色主题日历面板）
- 📅 基于北京时间（Asia/Shanghai）的当前日期标识
- 🏷️ 支持在日期上显示事件徽章
- 🖱️ 可点击的事件徽章，支持自定义事件处理
- 🌐 中文本地化支持
- 📱 固定尺寸布局（328px × 自适应高度）
- 🎯 非当月日期半透明显示（30%不透明度）

## 依赖项

```json
{
  "antd": "^6.1.3",
  "dayjs": "^1.11.19",
  "lucide-react": "^0.453.0",
  "react": "^18.2.0"
}
```

此外，组件还依赖项目中的 shadcn/ui 组件：
- `Badge` 组件
- `Button` 组件

## 安装

组件已包含在项目中，位于 `src/components/CustomCalendar/` 目录。

确保安装了所有依赖项：

```bash
npm install
```

## 基本使用

### 最简单的用法

```tsx
import { CustomCalendar } from '@/components/CustomCalendar';

function App() {
  return <CustomCalendar />;
}
```

### 带事件数据的用法

```tsx
import { CustomCalendar, EventData } from '@/components/CustomCalendar';
import dayjs from 'dayjs';

function App() {
  const eventData: EventData = {
    "2025-12-09": [
      { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" },
      { text: "报名", color: "bg-[#bbfd3b]", id: "signup-1" }
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
```

### 完整示例（包含事件点击处理）

```tsx
import { CustomCalendar, BadgeData, EventData } from '@/components/CustomCalendar';
import type { Dayjs } from 'dayjs';

function App() {
  const eventData: EventData = {
    "2025-12-09": [
      { text: "初赛", color: "bg-[#fb7a38]", id: "preliminary-1" }
    ]
  };

  const handleEventClick = (event: BadgeData, date: Dayjs) => {
    console.log('事件被点击:', {
      eventId: event.id,
      eventText: event.text,
      date: date.format("YYYY-MM-DD")
    });

    // 跳转到详情页
    // window.location.href = `/event/${event.id}`;
    // 或使用 React Router:
    // navigate(`/event/${event.id}`);
  };

  return (
    <CustomCalendar
      eventData={eventData}
      onEventClick={handleEventClick}
      defaultValue="2025-12-01"
      ufoIconSrc="/custom-icon.png"
    />
  );
}
```

## API 文档

### CustomCalendarProps

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `eventData` | `EventData` | `{}` | 日历事件数据对象，key 为日期字符串（YYYY-MM-DD），value 为事件数组 |
| `defaultValue` | `Dayjs \| string` | `dayjs()` | 日历默认显示的日期，可以是 dayjs 对象或日期字符串 |
| `onEventClick` | `(event: BadgeData, date: Dayjs) => void` | `undefined` | 事件点击回调函数 |
| `ufoIconSrc` | `string` | `"/icon-ufo.png"` | 头部图标的图片路径 |

### BadgeData

事件徽章数据结构：

```typescript
interface BadgeData {
  text: string;      // 事件文本
  color: string;     // 背景颜色类名（支持 Tailwind CSS）
  id?: string;       // 可选的事件唯一标识符
}
```

### EventData

事件数据对象结构：

```typescript
interface EventData {
  [key: string]: BadgeData[];  // key 为日期字符串（YYYY-MM-DD）
}
```

## 样式定制

组件使用自定义 CSS 文件 `calendar-custom.css`。如需修改样式，可以：

1. **直接修改 CSS 文件**：编辑 `src/components/CustomCalendar/calendar-custom.css`

2. **覆盖 CSS 变量**：在父组件中添加自定义样式

3. **主要样式类**：
   - `.calendar-container` - 日历容器
   - `.calendar-header` - 头部区域
   - `.current-date-circle` - 当前日期圆圈
   - `.event-badge` - 事件徽章
   - `.calendar-date-cell` - 日期单元格

### 颜色定制示例

修改头部和当前日期的颜色：

```css
/* 修改头部背景色 */
.calendar-container {
  background: #your-color;
}

.calendar-header {
  background: #your-color;
}

/* 修改当前日期圆圈颜色 */
.current-date-circle {
  background: #your-color;
  color: #your-text-color;
}

/* 修改日历主体背景色 */
.calendar-container .ant-picker-content,
.calendar-container .ant-picker-cell {
  background: #your-dark-color;
}
```

## 事件颜色预设

组件支持 Tailwind CSS 背景色类名，以下是一些推荐配色：

```typescript
const eventColors = {
  primary: "bg-[#bbfd3b]",    // 荧光绿
  warning: "bg-[#fb7a38]",    // 橙色
  info: "bg-blue-500",        // 蓝色
  success: "bg-green-500",    // 绿色
  danger: "bg-red-500",       // 红色
};
```

## 时区处理

组件自动使用北京时间（Asia/Shanghai）来判断当前日期。如需更改时区：

1. 修改 `CustomCalendar.tsx` 中的时区设置：

```typescript
const today = dayjs().tz("Asia/Shanghai");  // 改为其他时区
```

支持的时区示例：
- `"Asia/Shanghai"` - 北京时间
- `"America/New_York"` - 纽约时间
- `"Europe/London"` - 伦敦时间
- `"Asia/Tokyo"` - 东京时间

## 注意事项

1. **事件数量限制**：每个日期最多显示 2 个事件徽章，超出部分会被隐藏（CSS `height: 28px` 限制）

2. **日期格式**：事件数据的日期 key 必须使用 `YYYY-MM-DD` 格式

3. **非当月日期**：非当前月的日期会以 30% 不透明度显示

4. **固定尺寸**：组件宽度固定为 328px，高度自适应（最大 338px）

5. **图标资源**：确保 `ufoIconSrc` 指向的图标文件存在于 `public` 目录

## 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 示例效果

```
┌──────────────────────────────────┐
│    ◀  2025年12月  ▶    🛸       │ ← 荧光绿头部
├──────────────────────────────────┤
│ 周日 周一 周二 周三 周四 周五 周六 │
│  1    2    3    4    5    6    7 │
│  8    9   10   11   12   13   14 │
│       [初赛] [报名]               │ ← 事件徽章
│ 15   16   17  ⓲   19   20   21 │ ← 当前日期
│ 22   23   24   25   26   27   28 │
│     [决赛]                        │
│ 29   30   31                      │
└──────────────────────────────────┘
```

## 常见问题

### Q: 如何添加更多事件到同一天？

A: 在 `eventData` 中为该日期添加更多 `BadgeData` 对象：

```typescript
const eventData = {
  "2025-12-09": [
    { text: "事件1", color: "bg-[#fb7a38]", id: "event-1" },
    { text: "事件2", color: "bg-[#bbfd3b]", id: "event-2" }
  ]
};
```

### Q: 如何修改日历大小？

A: 修改 `calendar-custom.css` 中的尺寸变量：

```css
.calendar-container {
  width: 328px;  /* 修改为你需要的宽度 */
}
```

### Q: 如何禁用事件点击？

A: 不传递 `onEventClick` 属性即可。默认会在控制台输出日志。

### Q: 当前日期圆圈不显示？

A: 检查系统时区设置，组件使用北京时间判断当前日期。

## 更新日志

### v1.0.0 (2025-01-05)
- 初始版本发布
- 支持事件展示和点击
- 北京时间同步
- 完整的 TypeScript 类型支持

## 技术支持

如有问题或建议，请联系开发团队。
