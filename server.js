import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import render from "./src/ServerSide.jsx";

const PORT = process.env.PORT || 3001;
const html = fs.readFileSync(path.resolve(__dirname, "./dist/client/index.html")).toString();

const parts = html.split("not rendered");
const app = express();

app.use((req, res) => {
  res.write(parts[0]);
  const steam = render(req.url, {
    onShellReady() {
      steam.pipe(res);
    },
    onShellError() {},
    onAllReady() {
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});
console.log(`listenting on https://localhost${PORT}`);
app.listen(PORT);
