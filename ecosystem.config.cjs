module.exports = {
  apps: [
    {
      name: "metric-ereport-frontend",
      script: "./.output/server/index.mjs",
      port: 3000,
      exec_mode: "cluster",
      instances: "max" // please edit this depending on the cluster server
    }
  ]
  // deploy: {
  //   // "production" is the environment name
  //   production: {
  //     user: "web", // user for ssh
  //     host: ["machine ip address"], // remote server host
  //     ssh_options: ["ForwardAgent=yes"], // ssh options
  //     repo: "git@git-repo.git", // repo as ssh uri
  //     ref: "origin/master", // branch to pull source from
  //     path: "/var/www/e-report", // path to store source code
  //     "post-deploy": "yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production"
  //   }
  // }
};
