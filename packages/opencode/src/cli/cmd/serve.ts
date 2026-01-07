import { Server } from "../../server/server"
import { cmd } from "./cmd"
import { withNetworkOptions, resolveNetworkOptions } from "../network"
import path from "path"

export const ServeCommand = cmd({
  command: "serve",
  builder: (yargs) =>
    withNetworkOptions(yargs).option("cwd", {
      alias: ["root"],
      describe: "working directory",
      type: "string",
    }),
  describe: "starts a headless opencode server",
  handler: async (args) => {
    const opts = await resolveNetworkOptions(args)
    const base = process.env.PWD ?? process.cwd()
    const cwd = args.cwd ? path.resolve(base, args.cwd) : undefined
    const server = Server.listen({ ...opts, directory: cwd })
    console.log(`opencode server listening on http://${server.hostname}:${server.port}`)
    await new Promise(() => {})
    await server.stop()
  },
})
