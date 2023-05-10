const path = require("path");

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      "@assets": resolvePath("./src/assets"),
      "@components": resolvePath("./src/components"),
      "@containers": resolvePath("./src/containers"),
      "@pages": resolvePath("./src/pages"),
      "@store": resolvePath("./src/store"),
      "@styles": resolvePath("./src/styles"),
      "@types": resolvePath("./src/types"),
      "@utils": resolvePath("./src/utils"),
    },
  },
};
