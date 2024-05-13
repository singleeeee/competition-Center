一、competition-Center.zip
	本文件为小程序端前端文件
	1. 解压文件
	2. 确保电脑内已安装Node.js 14.0 以上的版本，通过Win + R 打开 快捷窗口，输入cmd打开命令窗口，输入node -v 如果出现版本号说明电脑已经安装nodejs
      （若未安装node.js）请前往 https://www.nodejs.com.cn/ 下载稳定版，安装选项全部保持默认，最后重复步骤2检查是否安装成功
	3. 在competition-Center目录打开终端，输入npm i 安装所有依赖
	4. 输入npx pnpm dev:mp-weixin 将代码编译成原生小程序代码，输出到dist目录
	5. 打开微信小程序开发工具，选择dist目录下的dev里的mp-weixin打开