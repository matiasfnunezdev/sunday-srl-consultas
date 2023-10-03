const path = require("node:path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
