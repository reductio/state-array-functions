import typescript from "rollup-plugin-typescript2";

export default {
  input: "index.ts",
  plugins: [typescript()],
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
};
