import type { NextConfig } from "next"
// import postcssImport from "postcss-import"

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
  //     use: ["raw-loader"],
  //   })

  //   config.module.rules.push({
  //     test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
  //     use: [
  //       {
  //         loader: "style-loader",
  //         options: {
  //           injectType: "singletonStyleTag",
  //           attributes: {
  //             "data-cke": true,
  //           },
  //         },
  //       },
  //       "css-loader",
  //       {
  //         loader: "postcss-loader",
  //         options: {
  //           postcssOptions: {
  //             plugins: [[postcssImport]],
  //           },
  //         },
  //       },
  //     ],
  //   })

  //   return config
  // },
}

export default nextConfig

