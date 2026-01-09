#!/bin/bash

# CustomCalendar 组件打包脚本
# 使用方法: ./scripts/package-calendar.sh

set -e

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置变量
VERSION="1.0.0"
PACKAGE_NAME="CustomCalendar-v${VERSION}"
SOURCE_DIR="src/components/CustomCalendar"
DIST_DIR="dist"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  CustomCalendar 组件打包工具${NC}"
echo -e "${BLUE}  版本: ${VERSION}${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. 清理旧文件
echo -e "${YELLOW}[1/7]${NC} 🧹 清理旧文件..."
rm -rf ${DIST_DIR}/${PACKAGE_NAME}
mkdir -p ${DIST_DIR}/${PACKAGE_NAME}
echo -e "${GREEN}✓ 完成${NC}"
echo ""

# 2. 创建目录结构
echo -e "${YELLOW}[2/7]${NC} 📁 创建目录结构..."
mkdir -p ${DIST_DIR}/${PACKAGE_NAME}/component
mkdir -p ${DIST_DIR}/${PACKAGE_NAME}/docs
mkdir -p ${DIST_DIR}/${PACKAGE_NAME}/assets
echo -e "${GREEN}✓ 完成${NC}"
echo ""

# 3. 复制组件文件
echo -e "${YELLOW}[3/7]${NC} 📦 复制组件文件..."
cp ${SOURCE_DIR}/CustomCalendar.tsx ${DIST_DIR}/${PACKAGE_NAME}/component/
cp ${SOURCE_DIR}/calendar-custom.css ${DIST_DIR}/${PACKAGE_NAME}/component/
cp ${SOURCE_DIR}/index.ts ${DIST_DIR}/${PACKAGE_NAME}/component/
cp ${SOURCE_DIR}/example.tsx ${DIST_DIR}/${PACKAGE_NAME}/component/
echo -e "${GREEN}✓ 复制了 4 个组件文件${NC}"
echo ""

# 4. 复制文档
echo -e "${YELLOW}[4/7]${NC} 📚 复制文档..."
cp ${SOURCE_DIR}/README.md ${DIST_DIR}/${PACKAGE_NAME}/docs/
cp ${SOURCE_DIR}/USAGE.md ${DIST_DIR}/${PACKAGE_NAME}/docs/
cp ${SOURCE_DIR}/INSTALL.md ${DIST_DIR}/${PACKAGE_NAME}/docs/
cp ${SOURCE_DIR}/DISTRIBUTION.md ${DIST_DIR}/${PACKAGE_NAME}/docs/
cp ${SOURCE_DIR}/CHANGELOG.md ${DIST_DIR}/${PACKAGE_NAME}/docs/
echo -e "${GREEN}✓ 复制了 5 个文档文件${NC}"
echo ""

# 5. 复制资源文件
echo -e "${YELLOW}[5/7]${NC} 🎨 复制资源文件..."
if [ -f "public/icon-ufo.png" ]; then
    cp public/icon-ufo.png ${DIST_DIR}/${PACKAGE_NAME}/assets/
    echo -e "${GREEN}✓ 复制了图标文件${NC}"
else
    echo -e "${YELLOW}⚠ 未找到 icon-ufo.png，跳过${NC}"
fi
echo ""

# 6. 复制配置文件
echo -e "${YELLOW}[6/7]${NC} 📝 复制配置文件..."
cp ${SOURCE_DIR}/package.json ${DIST_DIR}/${PACKAGE_NAME}/
echo -e "${GREEN}✓ 完成${NC}"
echo ""

# 7. 打包压缩
echo -e "${YELLOW}[7/7]${NC} 🗜️  压缩文件..."
cd ${DIST_DIR}

# 创建 ZIP
if command -v zip &> /dev/null; then
    zip -r -q ${PACKAGE_NAME}.zip ${PACKAGE_NAME}/
    ZIP_SIZE=$(du -h ${PACKAGE_NAME}.zip | cut -f1)
    echo -e "${GREEN}✓ 创建了 ${PACKAGE_NAME}.zip (${ZIP_SIZE})${NC}"
else
    echo -e "${YELLOW}⚠ 未找到 zip 命令，跳过 ZIP 打包${NC}"
fi

# 创建 TAR.GZ
if command -v tar &> /dev/null; then
    tar -czf ${PACKAGE_NAME}.tar.gz ${PACKAGE_NAME}/
    TAR_SIZE=$(du -h ${PACKAGE_NAME}.tar.gz | cut -f1)
    echo -e "${GREEN}✓ 创建了 ${PACKAGE_NAME}.tar.gz (${TAR_SIZE})${NC}"
else
    echo -e "${YELLOW}⚠ 未找到 tar 命令，跳过 TAR 打包${NC}"
fi

cd ..
echo ""

# 完成
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✅ 打包完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${BLUE}📦 输出文件：${NC}"
if [ -f "${DIST_DIR}/${PACKAGE_NAME}.zip" ]; then
    echo -e "   ${GREEN}✓${NC} ${DIST_DIR}/${PACKAGE_NAME}.zip"
fi
if [ -f "${DIST_DIR}/${PACKAGE_NAME}.tar.gz" ]; then
    echo -e "   ${GREEN}✓${NC} ${DIST_DIR}/${PACKAGE_NAME}.tar.gz"
fi
echo -e "   ${GREEN}✓${NC} ${DIST_DIR}/${PACKAGE_NAME}/ (源文件夹)"
echo ""

echo -e "${BLUE}📋 包含内容：${NC}"
echo -e "   ${GREEN}•${NC} 4 个组件文件"
echo -e "   ${GREEN}•${NC} 5 个文档文件"
echo -e "   ${GREEN}•${NC} 1 个配置文件"
echo -e "   ${GREEN}•${NC} 资源文件（如有）"
echo ""

echo -e "${BLUE}🚀 下一步：${NC}"
echo -e "   1. 查看打包内容: ${YELLOW}ls -lh ${DIST_DIR}/${NC}"
echo -e "   2. 测试解压: ${YELLOW}unzip ${DIST_DIR}/${PACKAGE_NAME}.zip -d test/${NC}"
echo -e "   3. 发送给下游: ${YELLOW}发送 ${DIST_DIR}/${PACKAGE_NAME}.zip${NC}"
echo ""

echo -e "${GREEN}打包完成时间: $(date)${NC}"
