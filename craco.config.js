const path = require("path");

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      "@components": resolvePath("./src/components"),
      "@containers": resolvePath("./src/containers"),
      "@styles": resolvePath("./src/styles"),
      "@store": resolvePath("./src/store"),
      "@types": resolvePath("./src/types"),
      "@utils": resolvePath("./src/utils"),
    },
  },
};
