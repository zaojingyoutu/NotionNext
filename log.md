# 修改记录

## 2025-02-11 Vercel 构建 `ReferenceError: ids is not defined`（slug-paths）

- **lib/db/notion/getPostBlocks.js** `fetchInBatches`：不再对参数 `ids` 重新赋值，改为局部变量 `blockIds`；空输入直接返回 `{}`；日志使用 `batch.length`，避免部分打包/严格模式下的边界问题。
- **lib/db/notion/RateLimiter.ts**：`crypto.randomUUID()` 改为 `import { randomUUID } from 'crypto'`，避免运行时 `crypto` 未定义（Node/打包环境差异）。

## 2025-02-11 Next.js 16 Turbopack 报错修复

- **next.config.js**：增加 `turbopack: {}`，消除 “using Turbopack, with a webpack config and no turbopack config” 的报错，使 `npm run dev` 能正常启动。若需完全使用原有 webpack 配置，可运行 `npm run dev -- --webpack`。

## 2025-02-11 Hexo 顶部导航菜单改为可配置（不再写死）

- **themes/hexo/config.js**
  - 新增 `HEXO_MENU_LINKS` 配置项：在主题配置里直接定义导航菜单数组，不依赖 Notion 的 Menu 类型。
  - 默认示例为：首页、友情链接、往期整理、关于我、留言板；可按需改 `name`、`href`、`icon`、`show`。

- **themes/hexo/components/MenuListTop.js**
  - 菜单优先级：① `HEXO_MENU_LINKS`（主题配置）→ ② Notion 的 Menu/SubMenu（当 `CUSTOM_MENU` 开启且有数据）→ ③ 默认首页/搜索/归档 + customNav。
  - 当 `HEXO_MENU_LINKS` 为非空数组时，完全使用该配置，不再使用写死的默认项。

- **themes/hexo/components/MenuListSide.js**
  - 侧边/移动端抽屉菜单与顶部导航一致：同样优先使用 `HEXO_MENU_LINKS`，再 Notion customMenu，再默认项。

- **themes/hexo/components/MenuItemDrop.js**（此前已改）
  - 展示文案兼容 `link.name ?? link.title`，子菜单兼容 `sLink?.name ?? sLink?.title`。

使用方式：在 `themes/hexo/config.js` 中修改 `HEXO_MENU_LINKS` 数组，将 `href` 改为你 Notion 中对应单页的 slug（如 `/about`、`/link`、`/message` 等），保存后重新构建即可生效。
