module.exports = {
    apps: [
      {
        name: "my-app",
        script: "src/index.js", // Corrected script path
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  