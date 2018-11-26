## 背景   

这是个有趣的小项目.公司有不少系统是使用不同的语言写的,而有些语言调用smtp邮件服务器不是那么方便,那么我们的设想是写一个web app,提供一个POST的数据接口,能够接收email的信息.比如收件人地址,名字,邮件正文等,然后在web app内部再调用smtp服务器发送.公司内部其他系统想要发送邮件的话,只需要发送一个HTTP POST请求就好了.

 

## 思路     
- 使用express充当web server，创建路由。   
- 使用nodemailer创建smtp连接，发送邮件    

 

## 注意事项   
1. POST数据格式，有好几种，比如application/json, application/w-www/form-urlencoded. 所以在express中要添建相应的middleware来正确的解析提交的数据。   

2. 控制发送email的速度。通过POST接受到数据之后，不是马上发送，而是push到一个array中。然后再在一个同步的环境中，main process中，设置一个timer，间隔发送邮件。在nodejs编程特别要注意，因为好多都是异步的环境，在异步的环境下，是控制不住间隔发送的。   

3. 然后为了提高server接受request的能力，我写了nodejs cluster来fork了4个process来同时接受HTTP POST，但是后来想一想，这些事情可以使用反向代理服务器比如Nginx来做   

4. 因为这个程序是要部署到server上，一直运行的，所以一定要有logger，保存运行数据和错误处理。在Linux上有个deamon程序叫做forever可以帮助布置和收集console.log的日志。不然的话就要自己写一个logger，代替console.log，把日志写到log文件中。     



