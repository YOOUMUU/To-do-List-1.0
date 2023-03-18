import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { getDate } from "./date.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // EJS的set-up
app.use(express.static("public")); // 上传服务器后在Express中提供静态文件服务如css和img, 另外要新建一个pubilc的文件夹放这些静态文件
app.use(bodyParser.urlencoded({ extended: true })); // body-parser的set-up

let items = ["Buy Food", "Cook Food", "Eat Food"];
const workListName = "Work List";
let workItems = [];

app.get("/", (req, res) => {
  const day = getDate();
  res.render("list", { listTitle: day, newListItem: items });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: workListName, newListItem: workItems });
});

app.post("/", (req, res) => {
  if (req.body.list === workListName) {
    workItems.push(req.body.new);
    res.redirect("/work");
  } else {
    items.push(req.body.new);
    res.redirect("/");
  }
});

app.listen(process.env.POST || port, () => {
  console.log(`Server is running on port ${port}`);
});
