# Vue3 Admin Vite Project - 后端服务

这是 [vue3-admin-vite-project](https://github.com/xubaobao19940428/vue3-admin-vite-project) 的后端服务，提供用户认证（包括验证码登录和账号密码登录）功能。后续将会添加权限管理和更多数据处理功能。

## 功能特点

-   **用户认证**
    -   用户名和密码登录
    -   短信验证码登录
-   **未来增强**
    -   权限系统
    -   更多用户数据管理功能

## 技术栈

-   **Node.js**: 后端运行时环境
-   **Koa**: Web 框架
-   **MySQL**: 数据库
-   **Redis**: 用于会话管理和缓存
-   **JWT**: JSON Web Token，用于用户认证
-   **Bcrypt**: 用于密码加密

## 项目结构

    my-node-mysql-app/
        ├── config/ # 配置文件（数据库、环境变量等）
        ├── routes/ # API 路由
        ├── controllers/ # 请求处理控制器
        ├── models/ # 数据库模型
        ├── middleware/ # 自定义中间件（如认证）
        ├── app.js # 应用主入口
        └── package.json # 项目依赖和脚本

### 依赖安装

    ```bash
        npm install
    ```

### 在项目根目录创建 .env 文件，并配置以下环境变量：

```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=你的数据库密码
    DB_NAME=你的数据库名称
    JWT_SECRET=你的JWT密钥
    REDIS_HOST=localhost
    REDIS_PORT=6379
```
### 启动开发服务器：
    ```bash
    npm run dev
    ```

### 启动生产服务器：
    ```bash
    npm run start
    ```

## 贡献

如果你有任何建议或想要贡献代码，请随时提交 Pull Request 或创建 Issue。

## 许可证

本项目采用 MIT 许可证。请查看 LICENSE 文件了解更多信息。