# CustomCalendar 安装指南

快速安装并使用 CustomCalendar 组件。

---

## 📋 前置要求

- React 18.2+
- Node.js 16+
- TypeScript 5.0+（推荐）

---

## 🚀 安装步骤

### 第一步：安装依赖

在你的项目根目录运行：

```bash
npm install antd dayjs lucide-react
```

或使用 yarn：

```bash
yarn add antd dayjs lucide-react
```

或使用 pnpm：

```bash
pnpm add antd dayjs lucide-react
```

### 第二步：复制组件文件

将 `CustomCalendar` 文件夹复制到你的项目中：

```bash
# 假设你收到的是 CustomCalendar.zip
unzip CustomCalendar.zip

# 复制到项目的 components 目录
cp -r CustomCalendar /your-project/src/components/
```

**组件文件结构**：
```
src/components/CustomCalendar/
├── CustomCalendar.tsx          # 主组件
├── calendar-custom.css         # 样式文件
├── index.ts                    # 导出入口
└── example.tsx                 # 示例代码
```

### 第三步：复制资源文件（可选）

如果你想使用默认的 UFO 图标：

```bash
cp icon-ufo.png /your-project/public/
```

如果不需要图标，可以在使用时隐藏：

```css
.calendar-header img {
  display: none;
}
```

### 第四步：配置 Tailwind CSS

如果你的项目还没有配置 Tailwind，请参考 [Tailwind CSS 官方文档](https://tailwindcss.com/docs/installation)。

确保 `tailwind.config.js` 包含组件路径：

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/CustomCalendar/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 第五步：导入并使用

在你的 React 组件中：

```tsx
import { CustomCalendar } from '@/components/CustomCalendar';
import type { EventData } from '@/components/CustomCalendar';

function App() {
  return (
    <div className="p-4">
      <CustomCalendar />
    </div>
  );
}

export default App;
```

---

## ✅ 验证安装

运行以下测试用例确认组件正常工作：

```tsx
import { CustomCalendar } from '@/components/CustomCalendar';
import type { EventData } from '@/components/CustomCalendar';
import dayjs from 'dayjs';

function TestCalendar() {
  const testEvents: EventData = {
    [dayjs().format("YYYY-MM-DD")]: [
      { text: "测试", color: "bg-blue-500", id: "test-1" }
    ]
  };

  const handleClick = (event, date) => {
    console.log('事件点击成功:', event, date.format("YYYY-MM-DD"));
    alert('安装成功！');
  };

  return (
    <CustomCalendar
      eventData={testEvents}
      onEventClick={handleClick}
    />
  );
}
```

如果你能看到日历并且点击事件后弹出提示，说明安装成功！

---

## 🔧 配置路径别名

如果你的项目使用了路径别名（如 `@/components`），需要配置：

### Vite 项目

`vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

### Create React App

安装 `react-app-rewired`:
```bash
npm install --save-dev react-app-rewired
```

`config-overrides.js`:
```javascript
const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    '@': path.resolve(__dirname, 'src')
  };
  return config;
};
```

### Next.js

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 📚 下一步

安装完成后，请查看以下文档：

1. **快速开始**：阅读 `README.md`
2. **详细文档**：阅读 `USAGE.md`
3. **示例代码**：查看 `example.tsx`

---

## ❗ 常见问题

### Q1: 导入组件时报错 "Module not found"

**解决方案**：
- 检查路径是否正确
- 确认已配置路径别名
- 尝试使用相对路径：`import { CustomCalendar } from './components/CustomCalendar'`

### Q2: 样式不生效

**解决方案**：
- 确认 Tailwind CSS 已正确配置
- 检查 `tailwind.config.js` 的 content 配置
- 确认 CSS 文件已被导入（组件会自动导入）

### Q3: TypeScript 类型错误

**解决方案**：
- 确保安装了 `@types/react`
- 检查 `tsconfig.json` 配置
- 使用 `// @ts-ignore` 临时跳过（不推荐）

### Q4: dayjs 时区问题

**解决方案**：
```bash
# 安装时区插件
npm install dayjs

# 在入口文件配置
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
```

### Q5: Ant Design 样式冲突

**解决方案**：
- 使用 CSS Modules 隔离样式
- 或在 `calendar-custom.css` 中增加更高的选择器优先级

---

## 🆘 技术支持

遇到问题？

1. 查看 `USAGE.md` 的"常见问题"章节
2. 检查 `example.tsx` 中的示例代码
3. 联系技术支持：your-email@example.com

---

## 📦 完整依赖列表

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "antd": "^6.1.3",
    "dayjs": "^1.11.19",
    "lucide-react": "^0.453.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

---

## ⏱️ 预计安装时间

- 安装依赖：2-5 分钟
- 复制文件：< 1 分钟
- 配置调试：5-10 分钟
- **总计**：约 10-15 分钟

---

安装愉快！🎉
