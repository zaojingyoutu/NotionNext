# 修改记录

## 2025-02-04

### next 主题接入打赏按钮 (RewardButton)

- **themes/next/config.js**  
  - 新增配置项：`NEXT_ARTICLE_REWARD: false`（文章页是否显示打赏按钮，默认关闭）。

- **themes/next/components/ArticleDetail.js**  
  - 引入 `RewardButton` 组件。  
  - 在分享条与版权声明之间增加打赏区域，当 `NEXT_ARTICLE_REWARD` 为 `true` 时渲染 `RewardButton`。

**使用方式**：在 next 主题的 `themes/next/config.js` 中将 `NEXT_ARTICLE_REWARD` 改为 `true`，或在 Notion 配置表中配置同名项为 `true`。需确保 `public/reward_code_alipay.jpg` 与 `public/reward_code_wechat.jpg` 存在。
