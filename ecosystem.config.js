module.exports = {
  apps: [
      {
          name: 'express-demo', // 应用名称
          script: './src/app.js', // 启动脚本
          cwd: './', // 当前工作路径
          watch: true, // 监控变化的目录
          exec_mode: 'cluster', // 集群模式
          instances: 'max', // 实例数量
          max_memory_restart: '40M', // 如果超过指定内存就重启
          ignore_watch: [ // 从监控目录中排除
              'node_modules',
              'logs'
          ],
          error_file: './logs/app-err.log', // 错误日志路径
          out_fileL: './logs/app-out.log', // 普通日志路径
          env: { // 默认环境变量
              NODE_ENV: 'production' // 环境变量
          },
          env_dev: { // 命令行可以指定当前环境变量为dev
              NODE_ENV: 'development'
          },
          env_prod: {
              NODE_ENV: 'production'
          }
      }
  ],
  deploy: { // 部署配置
      prod: { // 对应环境名称
          user: 'mjz',
          host: ['47.96.169.141'], // 要部署的服务器IP
          port: '39999', // 端口号
          path: '/home/pm2_test/', // 克隆到服务器上的路径
          repo: 'git@github.com:liangshaojie/pm2_test.git', // 仓库地址
          ref: 'origin/master', // 代码仓库的分支
          ssh_options: 'StrictHostKeyChecking=no', // 取消 key 校验
          'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js --env prod',
          env: {
              NODE_ENV: 'production'
          }
      }
  }
}