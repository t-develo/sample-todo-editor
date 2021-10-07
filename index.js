require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const { createCosmosDbClient, insertData, selectAll, updateItem, deleteItem } = require('./cosmos/CosmosRepository');
const staticdir = process.env.STATIC_DIR || __dirname;

// リクエストのルーティング
app.use("/img", express.static(staticdir + "/dist/img/"));
app.use("/css", express.static(staticdir + "/dist/css/"));
app.use("/js", express.static(staticdir + "/dist/js/"));
app.use("/fonts", express.static(staticdir + "/dist/fonts/"));
app.use("/favicon.ico", express.static(staticdir + "/dist/favicon.ico"));
app.get("/", (req, res) => res.sendFile(staticdir + "/dist/index.html"));

let cosmosClient = null;
// サーバープロセスの実行
app.listen(port, async () => {
    cosmosClient = await createCosmosDbClient();
    console.log("Server process is running.");
});

app.get("/api/todo/list", async (req, res) => {
    res.json(await getTodo());
});

app.post("/api/todo/add", async (req, res) => {
    await addTodo(req.body);
    res.json({ message: "success" });
});

app.post("/api/todo/update", async (req, res) => {
    await updateTodo(req.body);
    res.json({ message: "success" });
});

app.post("/api/todo/delete", async (req, res) => {
    await deleteTodo(req.body.id);
    res.json({ message: "success" });
});

// todo取得API
async function getTodo() {
    return await selectAll(cosmosClient)
}

// todo追加API
async function addTodo(todo) {
    await insertData(cosmosClient, todo);
}

// todo更新API
async function updateTodo(todoObj) {
    await updateItem(cosmosClient, todoObj.id, todoObj.id, todoObj);
}

// todo削除API
async function deleteTodo(id) {
    await deleteItem(cosmosClient, id, id);
}
