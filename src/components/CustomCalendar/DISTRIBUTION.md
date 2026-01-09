# CustomCalendar 组件分发指南

本文档说明如何将 CustomCalendar 组件打包并交付给下游使用。

---

## 📦 方案一：直接复制（推荐用于内部团队）

### 适用场景
- 内部团队协作
- 不需要版本管理
- 快速集成

### 打包步骤

#### 1. 准备文件清单

需要交付的完整文件列表：

```
CustomCalendar/
├── CustomCalendar.tsx          # 主组件
├── calendar-custom.css         # 样式文件
├── index.ts                    # 导出入口
├── README.md                   # 快速开始
├── USAGE.md                    # 详细文档
├── example.tsx                 # 使用示例
└── package.json               # 依赖说明（新建）
```

#### 2. 创建依赖说明文件

在 `CustomCalendar` 目录下创建 `package.json`：

```json
{
  "name": "custom-calendar",
  "version": "1.0.0",
  "description": "自定义日历组件",
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "antd": "^6.1.3",
    "dayjs": "^1.11.19",
    "lucide-react": "^0.453.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0"
  }
}
```

#### 3. 打包命令

```bash
# 方式 1: 直接压缩整个文件夹
cd src/components
zip -r CustomCalendar.zip CustomCalendar/

# 方式 2: 使用 tar
tar -czf CustomCalendar.tar.gz CustomCalendar/

# 方式 3: 排除不必要的文件
zip -r CustomCalendar.zip CustomCalendar/ -x "*.DS_Store" "node_modules/*"
```

#### 4. 交付清单

**必需文件**：
- ✅ CustomCalendar.tsx
- ✅ calendar-custom.css
- ✅ index.ts
- ✅ package.json（依赖说明）

**文档文件**：
- ✅ README.md
- ✅ USAGE.md
- ✅ example.tsx

**资源文件**（如果使用了自定义图标）：
- ✅ /public/icon-ufo.png

---

## 📝 方案二：NPM 包发布（推荐用于外部分发）

### 适用场景
- 需要版本管理
- 外部团队使用
- 需要自动更新

### 准备步骤

#### 1. 创建独立项目结构

```
custom-calendar-package/
├── src/
│   ├── CustomCalendar.tsx
│   ├── calendar-custom.css
│   └── index.ts
├── public/
│   └── icon-ufo.png
├── package.json
├── README.md
├── USAGE.md
├── tsconfig.json
└── vite.config.ts
```

#### 2. 配置 package.json

```json
{
  "name": "@yourorg/custom-calendar",
  "version": "1.0.0",
  "description": "自定义日历组件",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "USAGE.md"
  ],
  "scripts": {
    "build": "vite build",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "antd": "^6.1.3",
    "dayjs": "^1.11.19",
    "lucide-react": "^0.453.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.0.0",
    "vite": "^6.0.4"
  },
  "keywords": [
    "react",
    "calendar",
    "component",
    "ui"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourorg/custom-calendar"
  }
}
```

#### 3. 配置 vite.config.ts（用于打包）

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CustomCalendar',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'cjs'}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', 'dayjs', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          dayjs: 'dayjs',
          'lucide-react': 'LucideReact'
        }
      }
    }
  }
});
```

#### 4. 发布到 NPM

```bash
# 登录 NPM
npm login

# 构建
npm run build

# 发布
npm publish

# 发布到私有仓库（如果使用）
npm publish --registry=https://your-private-registry.com
```

#### 5. 下游使用

```bash
npm install @yourorg/custom-calendar
```

```tsx
import { CustomCalendar } from '@yourorg/custom-calendar';
import '@yourorg/custom-calendar/dist/style.css';
```

---

## 🔗 方案三：Git Submodule（推荐用于多项目共享）

### 适用场景
- 多个项目共享同一组件
- 需要同步更新
- 团队使用 Git

### 步骤

#### 1. 创建组件仓库

```bash
# 在 GitHub/GitLab 创建新仓库
git init custom-calendar
cd custom-calendar

# 复制组件文件
cp -r /path/to/CustomCalendar/* .

# 提交
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. 下游项目添加 submodule

```bash
# 在下游项目中
cd your-project
git submodule add https://github.com/yourorg/custom-calendar.git src/components/CustomCalendar

# 初始化
git submodule update --init --recursive
```

#### 3. 更新 submodule

```bash
# 获取最新代码
cd src/components/CustomCalendar
git pull origin main
```

---

## 📋 方案四：复制粘贴指南（最简单）

### 下游使用步骤

#### 1. 复制文件

下游开发者收到压缩包后：

```bash
# 解压
unzip CustomCalendar.zip

# 复制到项目
cp -r CustomCalendar /path/to/your-project/src/components/
```

#### 2. 安装依赖

```bash
npm install antd dayjs lucide-react
```

#### 3. 导入使用

```tsx
import { CustomCalendar } from '@/components/CustomCalendar';
import type { EventData } from '@/components/CustomCalendar';
```

#### 4. 配置 Tailwind（如果还没配置）

`tailwind.config.js`:
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

---

## 📦 完整交付包结构

### 推荐的交付包内容

```
CustomCalendar-v1.0.0/
├── 📁 component/                    # 组件源码
│   ├── CustomCalendar.tsx
│   ├── calendar-custom.css
│   ├── index.ts
│   └── example.tsx
│
├── 📁 docs/                         # 文档
│   ├── README.md                   # 快速开始
│   ├── USAGE.md                    # 详细文档
│   ├── DISTRIBUTION.md             # 本文档
│   └── CHANGELOG.md                # 版本变更记录
│
├── 📁 assets/                       # 资源文件
│   └── icon-ufo.png
│
├── 📄 package.json                  # 依赖说明
├── 📄 INSTALL.md                    # 安装指南
└── 📄 LICENSE                       # 许可证
```

### 创建 INSTALL.md

```markdown
# 安装指南

## 1. 安装依赖

\`\`\`bash
npm install antd dayjs lucide-react
\`\`\`

## 2. 复制组件

将 `component` 文件夹复制到你的项目：

\`\`\`bash
cp -r component /your-project/src/components/CustomCalendar
\`\`\`

## 3. 复制资源文件（可选）

\`\`\`bash
cp assets/icon-ufo.png /your-project/public/
\`\`\`

## 4. 导入使用

\`\`\`tsx
import { CustomCalendar } from '@/components/CustomCalendar';

function App() {
  return <CustomCalendar />;
}
\`\`\`

## 5. 查看文档

- 快速开始：`docs/README.md`
- 详细文档：`docs/USAGE.md`
- 示例代码：`component/example.tsx`
```

### 创建 CHANGELOG.md

```markdown
# 更新日志

## [1.0.0] - 2025-01-05

### ✨ 新增
- 初始版本发布
- 支持事件展示和点击
- 北京时间自动同步
- 当前日期高亮
- 完整 TypeScript 类型支持

### 📚 文档
- 快速开始指南
- 详细使用文档
- 8 个实用示例
- 完整 API 参考

### 🎨 样式
- 荧光绿主题
- 深色日历面板
- 响应式设计
```

---

## 🚀 自动化打包脚本

### 创建打包脚本 `scripts/package.sh`

```bash
#!/bin/bash

# 设置变量
VERSION="1.0.0"
PACKAGE_NAME="CustomCalendar-v${VERSION}"
SOURCE_DIR="src/components/CustomCalendar"
DIST_DIR="dist"

# 清理旧文件
echo "🧹 清理旧文件..."
rm -rf ${DIST_DIR}
mkdir -p ${DIST_DIR}/${PACKAGE_NAME}

# 复制组件文件
echo "📦 复制组件文件..."
mkdir -p ${DIST_DIR}/${PACKAGE_NAME}/component
cp ${SOURCE_DIR}/*.tsx ${DIST_DIR}/${PACKAGE_NAME}/component/
cp ${SOURCE_DIR}/*.css ${DIST_DIR}/${PACKAGE_NAME}/component/
cp ${SOURCE_DIR}/*.ts ${DIST_DIR}/${PACKAGE_NAME}/component/

# 复制文档
echo "📚 复制文档..."
mkdir -p ${DIST_DIR}/${PACKAGE_NAME}/docs
cp ${SOURCE_DIR}/README.md ${DIST_DIR}/${PACKAGE_NAME}/docs/
cp ${SOURCE_DIR}/USAGE.md ${DIST_DIR}/${PACKAGE_NAME}/docs/
cp ${SOURCE_DIR}/DISTRIBUTION.md ${DIST_DIR}/${PACKAGE_NAME}/docs/

# 复制资源
echo "🎨 复制资源文件..."
mkdir -p ${DIST_DIR}/${PACKAGE_NAME}/assets
cp public/icon-ufo.png ${DIST_DIR}/${PACKAGE_NAME}/assets/

# 创建 package.json
echo "📝 创建 package.json..."
cat > ${DIST_DIR}/${PACKAGE_NAME}/package.json << 'EOF'
{
  "name": "custom-calendar",
  "version": "1.0.0",
  "description": "自定义日历组件",
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "antd": "^6.1.3",
    "dayjs": "^1.11.19",
    "lucide-react": "^0.453.0"
  }
}
EOF

# 创建 INSTALL.md
echo "📄 创建安装指南..."
cat > ${DIST_DIR}/${PACKAGE_NAME}/INSTALL.md << 'EOF'
# 安装指南

## 1. 安装依赖
\`\`\`bash
npm install antd dayjs lucide-react
\`\`\`

## 2. 复制组件
\`\`\`bash
cp -r component /your-project/src/components/CustomCalendar
\`\`\`

## 3. 导入使用
\`\`\`tsx
import { CustomCalendar } from '@/components/CustomCalendar';
\`\`\`

详细文档请查看 docs/USAGE.md
EOF

# 打包
echo "🗜️  压缩文件..."
cd ${DIST_DIR}
zip -r ${PACKAGE_NAME}.zip ${PACKAGE_NAME}/
tar -czf ${PACKAGE_NAME}.tar.gz ${PACKAGE_NAME}/

echo "✅ 打包完成！"
echo "📦 输出文件："
echo "   - ${DIST_DIR}/${PACKAGE_NAME}.zip"
echo "   - ${DIST_DIR}/${PACKAGE_NAME}.tar.gz"
```

### 使用打包脚本

```bash
# 赋予执行权限
chmod +x scripts/package.sh

# 执行打包
./scripts/package.sh
```

---

## ✅ 交付检查清单

发送给下游前，确保以下内容完整：

### 代码文件
- [ ] CustomCalendar.tsx
- [ ] calendar-custom.css
- [ ] index.ts
- [ ] example.tsx

### 文档文件
- [ ] README.md（快速开始）
- [ ] USAGE.md（详细文档）
- [ ] INSTALL.md（安装指南）
- [ ] CHANGELOG.md（版本记录）

### 配置文件
- [ ] package.json（依赖说明）
- [ ] tsconfig.json（TypeScript 配置，可选）

### 资源文件
- [ ] icon-ufo.png 或其他图标

### 测试验证
- [ ] 组件能正常导入
- [ ] 样式文件正常加载
- [ ] TypeScript 类型正确
- [ ] 示例代码可运行
- [ ] 文档链接无误

---

## 📧 交付说明模板

发送邮件给下游时使用：

```
主题：CustomCalendar 组件 v1.0.0 交付

您好，

现将 CustomCalendar 日历组件交付给您，详细信息如下：

📦 组件版本：v1.0.0
📅 交付日期：2025-01-05

📋 包含内容：
  - 完整组件源码（3 个文件）
  - 详细使用文档（2 个文档）
  - 8 个实用示例
  - 安装指南

🚀 快速开始：
  1. 解压附件
  2. 阅读 INSTALL.md
  3. 复制组件到项目
  4. 安装依赖并使用

📚 文档导航：
  - 快速开始：docs/README.md
  - 详细文档：docs/USAGE.md
  - 示例代码：component/example.tsx

🔧 技术支持：
  如有问题请联系 your-email@example.com

祝使用愉快！
```

---

## 🎯 推荐方案总结

| 方案 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| **方案一：直接复制** | 内部团队、快速集成 | 简单快速 | 无版本管理 |
| **方案二：NPM 包** | 外部分发、需要版本管理 | 专业规范 | 配置复杂 |
| **方案三：Git Submodule** | 多项目共享 | 易于同步 | 需要 Git |
| **方案四：压缩包** | 一次性交付 | 最简单 | 更新麻烦 |

### 我的推荐

- **快速交付**：使用方案一 + 自动化脚本
- **长期维护**：使用方案二（NPM）
- **团队协作**：使用方案三（Git Submodule）
