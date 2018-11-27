module.exports = {
  apps : [{
    name: 'API',
    script: './src/app.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '47.96.169.141',
      ref  : 'origin/master',
      repo : 'git@github.com:liangshaojie/pm2_test.git',
      path : '/home/pm2_test',
      'post-deploy' : 'git pull && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
