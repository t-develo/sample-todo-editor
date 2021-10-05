require('dotenv').config();
const express = require("express");
const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const { createCosmosDbClient, insertData, selectAll, updateItem, deleteItem } = require('./cosmos/CosmosRepository');

// リクエストのルーティング
app.use("/img", express.static(__dirname + "/dist/img/"));
app.use("/css", express.static(__dirname + "/dist/css/"));
app.use("/js", express.static(__dirname + "/dist/js/"));
app.use("/fonts", express.static(__dirname + "/dist/fonts/"));
app.use("/favicon.ico", express.static(__dirname + "/dist/favicon.ico"));
app.get("/", (req, res) => res.sendFile(__dirname + "/dist/index.html"));

let cosmosClient = null;
// サーバープロセスの実行
app.listen(3000, async () => {
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
