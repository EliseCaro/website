# 天河站群（商业版）

### 运行环境
``` bash
    1：centOS 7.x
    2: mysql 5.6x
    3: 服务器要求4核4G以上
```

### 安装程序
``` bash
    1：下载代码：https://github.com/EliseCaro/website.git
    2：将下载的代码解压到您要部署的目录
    3：修改配置：website->conf->app.conf文件（详情见下部分）
```

### 配置大纲
``` bash

    httpport:监听端口([nginx:80][NoNginx:8080])
    
    db_host = 127.0.0.1      (数据库IP)
    db_username = root       (数据库用户名)
    db_password = root       (数据库密码)
    db_database = website    (数据库名)
    db_port = 3306           (数据库端口)
    db_charset = utf8mb4     (数据库编码)
    
    redis_host = 127.0.0.1   (留空则不使用Redis缓存)
    redis_port = 6379        (redis端口)
    redis_db = 0             (redisDb)
    redis_prefix = "th_"     (redis前缀)
    redis_password = "root"  (redis密码)
    
    auth_key = ""            (管理员给你的appkey)

```

### 运行
``` bash
    1：在项目根目录下面运行命令(查看安装过程)：./website
    2：在项目根目录下面运行命令(跳过安装过程)：nohup ./website &
    3：第一次安装建议先查看安装过程，安装无问题在（运行第二种模式）注入后台运行
    4：制作系统服务将在下一次更新出文档：
    5：默认用户名：Spider@TianHe.com
    6：默认用户密码：TianWebSite
    7：后台地址：http://授权域名/admin/admin/index
    8: 数据库配置成功的情况下将由程序自行初始化数据库
```

### 使用宝塔Nginx
``` bash
    1：解析域名导宝塔
    2：添加站点-添加域名->选择数据库（PHP版本选择纯静态）（其他选项无关紧要）->提交
    3：成功后->编辑该站点->反向代理->添加反向代理->目标url（填http://127.0.0.1:8080）；端口为您监听的端口；不要勾选缓存！
    4：访问域名应该成功！
```

### 售后
``` bash
    1：售后QQ群（SEO研究群）：682378784；没有购买的用户也可以加入！
```

### 简单演示

![](http://araneid-demo.test.upcdn.net/demo01.png)
![](http://araneid-demo.test.upcdn.net/demo02.png)
