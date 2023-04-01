import { Context, Schema } from 'koishi'
import {} from "koishi-plugin-puppeteer";

export const name = 'latex-image'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export const using = ["puppeteer"] as const;

export function apply(ctx: Context) {
  ctx.command("latex <formula:text>", "渲染LaTeX公式").action(async (_, formula) => {
    if (!formula) return "请给定公式！"
    const h = `<html>
        <head>
          <style>
            body {
              width: min-content;
              height: min-content;
            }
          </style>
          <script id="MathJax-script" async src="https://cdn.staticfile.org/mathjax/3.2.2/es5/tex-svg.min.js"></script>
        </head>
        <body>
          $$${formula}$$
        </body>
      </html>`
    return await ctx.puppeteer.render(h)
  });
}
