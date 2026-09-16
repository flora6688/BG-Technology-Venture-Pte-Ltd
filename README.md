# BG Technology 企业官网

中英双语、六类页面、静态 HTML/CSS/JavaScript。英文默认，语言切换保留当前页面；语言偏好仅保存在浏览器。无需数据库、API Key 或第三方运行依赖。

## 直接使用

`dist/` 已包含生成的完整网站，可以部署到支持静态文件的服务器。请通过 HTTP 预览，不建议双击 HTML 使用 file://。

```sh
cd bgtechsg
npm run build
npm run check
npm start
```

需要 Node.js 20 或更高版本。没有依赖，无需 npm install。预览地址为 http://127.0.0.1:4173 。

## 上传 GitHub 并部署

Git 是版本管理工具；网站托管可使用 GitHub Pages。本项目包含 GitHub Actions 部署配置。

1. 在 GitHub 新建仓库。将本文件夹的**内容**放在仓库根目录，包括 `.github/workflows/pages.yml`；不要只上传 dist，也不要在仓库外再套一层 bgtechsg 目录。
2. 提交到 `main` 分支。如果默认分支不是 main，修改工作流的 branches 设置。
3. 仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**。
4. 在 Actions 中运行 **Deploy website to GitHub Pages**，或再次推送到 main。工作流构建、检查并发布 dist。
5. 部署完成后，从 Pages 或 Actions 获取实际访问地址。

命令行上传示例（将地址换为自己的新建空仓库）：

```sh
cd bgtechsg
git init -b main
git add .
git commit -m "Add bilingual BG Technology website"
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

项目使用相对资源与导航路径，适配 `https://ACCOUNT.github.io/REPOSITORY/` 这种带仓库路径的地址。不需要 SPA 重写规则。

也可直接上传 dist 到其他静态托管平台；构建命令为 `npm run build`，输出目录为 `dist`。

## 自定义域名

确认公司持有 bgtechsg.global 后，由域名管理员在托管平台配置自定义域名，并依据该平台提供的记录设置 DNS。不要删除邮箱使用的 MX/TXT 等记录。本项目没有预设 CNAME 或绑定未经核实的域名。

## 修改位置

- `src/content.mjs`：公司信息、全部中英文文案。company.uen 与 company.address 为空时不会显示。
- `src/style.css`：颜色、排版、响应式样式。
- `src/site.js`：手机导航及语言偏好。
- `src/favicon.svg`：文字品牌的简易站点图标。
- `scripts/build.mjs`：静态页面模板及生成逻辑。
- `dist/`：可直接部署的输出；修改 src 后重新构建，不要只修改 dist。
- `.github/workflows/pages.yml`：GitHub Pages 自动部署。

## 发布前内容核实

本交付未向远程 Git 仓库推送，也未发布网站。设计中的 BG Technology 是暂定文字品牌。

当前页面根据用户提供的“未来准备申请 MPI”信息编写，不代表已核验注册或牌照状态。上线前核实公司全称、实际业务规划、牌照状态及邮箱收发。补充 UEN 和注册地址，并由合规人员核对业务状态说明。

隐私声明和网站条款是可编辑草案。应按实际托管与邮件服务商、跨境处理、保留政策及公司指定 DPO 联系方式补充审核；现有代码未把合规邮箱宣称为 DPO 邮箱。若后续添加表单、分析工具或其他数据处理，应同步更新声明。

所有受监管业务均标注为规划内容；网站没有开户、收款、汇款、支付报价或交易入口。声明和标签不能替代对实际业务及网站整体的合规判断。

## 内容参考

- [MAS 支付服务分类](https://ask.gov.sg/mas/questions/clx8ktis400bvryozwe0wzsg7)
- [新加坡支付服务法](https://sso.agc.gov.sg/Act/PSA2019)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)

不含外部图片、远程字体、广告追踪、分析脚本或生产环境第三方 JavaScript 库。
