# 多阶段构建 Dockerfile for React + Vite 前端项目

# 第一阶段：构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./
COPY pnpm-lock.yaml ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 设置构建时环境变量（这些变量会被 Vite 在构建时注入到代码中）
ARG VITE_API_BASE_URL=https://extractra-backend-390508460309.us-central1.run.app
ARG VITE_WS_BASE_URL=wss://extractra-backend-390508460309.us-central1.run.app

# 将 ARG 转换为 ENV，确保构建过程中可以访问
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_WS_BASE_URL=$VITE_WS_BASE_URL

# 构建应用（Vite 会在构建时将环境变量注入到代码中）
RUN pnpm run build

# 第二阶段：生产运行阶段
FROM node:18-alpine AS production

# 设置工作目录
WORKDIR /app

# 安装 serve 和 curl（用于健康检查）
RUN npm install -g serve && \
    apk add --no-cache curl

# 从构建阶段复制构建产物
COPY --from=builder /app/dist ./dist

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

# 启动命令
CMD ["serve", "-s", "dist", "-l", "8080"] 