# Agent Context File

## 项目概述

王德芳的个人品牌作品集网站。前端使用 React + Vite，后端使用 Django + SimpleUI 管理后台。网站包含登录注册系统、个人作品展示、项目案例、技能展示和联系方式等模块。

## 技术栈

| 层面 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | ^18.3.1 |
| 构建工具 | Vite | ^6.0.0 |
| 路由 | react-router-dom | ^6.28.0 |
| 动画 | GSAP | ^3.12.5 |
| 后端框架 | Django | 6.0.6 |
| 后台主题 | django-simpleui | 2026.1.13 |
| 数据库 | SQLite (默认) | — |
| 包管理 | npm | — |

## 目录结构

```
前端/
├── .venv/                    # Python 虚拟环境
├── config/                   # Django 项目配置
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── main/                     # Django 应用
│   ├── migrations/
│   ├── admin.py
│   ├── models.py
│   ├── views.py
│   └── ...
├── public/
│   └── favicon.svg
├── src/                      # React 前端源码
│   ├── pages/
│   │   ├── Login.jsx         # 登录/注册页面
│   │   └── Home.jsx          # 首页（组合所有 section 组件）
│   ├── components/
│   │   ├── Navbar.jsx        # 固定导航栏（滚动监听 + 退出按钮）
│   │   ├── Hero.jsx          # 全屏 Hero（Canvas 粒子动画）
│   │   ├── Experience.jsx    # 个人经历模块
│   │   ├── Projects.jsx      # 精选项目（大卡片）
│   │   ├── Skills.jsx        # 个人优势（能力卡片网格）
│   │   └── Contact.jsx       # 底部联系方式（整屏收尾）
│   ├── styles/
│   │   └── index.css         # 全局暗色主题样式
│   ├── App.jsx               # 路由守卫 & 状态管理
│   └── main.jsx              # React 入口
├── agent.md                  # 本文件
├── package.json
├── vite.config.js
├── index.html
├── manage.py                 # Django 管理脚本
└── db.sqlite3                # SQLite 数据库文件
```

## 启动方式

### 前端（React + Vite）

```powershell
npm run dev
```

开发服务器默认运行在 `http://127.0.0.1:5173/`。

### 后端（Django）

```powershell
.venv\Scripts\Activate.ps1
python manage.py runserver 0.0.0.0:8000
```

管理后台运行在 `http://127.0.0.1:8000/admin/`。

### 管理员账号

- 用户名：`admin`
- 密码：`admin123`

## 前端架构说明

### 路由系统（App.jsx）

使用 `react-router-dom` 的客户端路由：

- `/` — 首页（受保护，需已登录）
- `/login` — 登录/注册页（已登录时自动跳转首页）

认证状态通过 `localStorage` 持久化（key: `auth_user`）。未登录用户自动重定向到 `/login`。

### 设计系统（styles/index.css）

- 版心最大宽度：`1700px`（`.container` 类）
- 颜色变量以 `--bg-*`、`--text-*`、`--accent-*` 命名
- 强调色：`#6c5ce7`（紫罗兰）和 `#a29bfe`（淡紫）
- 暗色基调：`#0a0a0a`、`#111111`、`#1a1a1a`
- 组件圆角统一：`--radius-sm: 8px` / `--radius-md: 12px` / `--radius-lg: 16px`

### 组件模式

所有 section 组件（Hero、Experience、Projects、Skills、Contact）遵循同一模式：

1. 用 `id` 属性作为滚动锚点（`id="hero"`、`id="experience"` 等）
2. 使用 `useRef` + `useEffect` + `gsap` + `ScrollTrigger` 实现滚动入场动画
3. 动画统一 `once: true`，仅触发一次
4. 每个组件的 `section` 标签包含 `padding: 140px 0`

### Navbar 行为

- 滚动超过 40px 后：毛玻璃背景 + 底部边框
- 监听滚动位置，自动高亮当前 section
- 点击导航项平滑滚动到对应锚点
- 右上角「退出」按钮清除 `localStorage` 认证状态

### 登录系统

- 用户注册数据存储在 `localStorage`（key: `users`）
- 登录成功后写入 `auth_user`，触发路由跳转
- 前端路由守卫，非真实后端认证（后续可对接 Django API）

## 后端说明

Django 项目作为管理后台使用，已配置：

- `django-simpleui`：美化后的后台界面
- 语言：中文（`zh-hans`）
- 时区：`Asia/Shanghai`
- SQLite 数据库已迁移完成

## 开发约定

1. **样式**：优先使用内联 `style` 对象，全局变量在 `index.css` 中定义
2. **动画**：使用 GSAP + ScrollTrigger，统一在组件的 `useEffect` 中注册
3. **命名**：组件用 PascalCase，文件用对应组件名的 PascalCase
4. **状态**：当前使用 `localStorage` 做简单认证，后续可改为后端 API 认证
5. **图片资源**：目前使用文字/gradient 占位，待替换为真实作品截图

## 后续优化方向

1. 接入 Django REST Framework 实现真实用户认证
2. 替换占位图片为真实项目截图
3. 添加移动端响应式适配
4. 使用 Three.js 替换 Canvas 粒子实现更丰富的 3D 效果
5. 集成后台数据管理能力（通过 Django API 管理项目、技能内容）
