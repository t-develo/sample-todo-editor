const express = require("express");
const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const todoList = require("./todo.json");

// リクエストのルーティング
app.use("/img", express.static(__dirname + "/dist/img/"));
app.use("/css", express.static(__dirname + "/dist/css/"));
app.use("/js", express.static(__dirname + "/dist/js/"));
app.use("/fonts", express.static(__dirname + "/dist/fonts/"));
app.use("/favicon.ico", express.static(__dirname + "/dist/favicon.ico"));
app.get("/", (req, res) => res.sendFile(__dirname + "/dist/index.html"));

// サーバープロセスの実行
app.listen(3000, () => {
    console.log("Server process is running.");
});

app.get("/api/todo/list", (req, res) => {
    res.json(getTodo());
});

app.post("/api/todo/add", (req, res) => {
    addTodo(req.body);
    res.json({ message: "success" });
});

app.post("/api/todo/update", (req, res) => {
    updateTodo(req.body.id, req.body.updateObj);
    res.json({ message: "success" });
});

app.post("/api/todo/delete", (req, res) => {
    deleteTodo(req.body.id);
    res.json({ message: "success" });
});

// todo取得API
function getTodo() {
    return todoList;
}

// todo追加API
function addTodo(todo) {
    todoList.push(todo);
}

// todo更新API
function updateTodo(id, todoObj) {
    todoList.forEach((todo) => {
        if (todo.id === id) {
            todo.title = todoObj.title;
            todo.content = todoObj.content;
        }
    });
}

// todo削除API
function deleteTodo(id) {
    const deleteIndex = todoList.findIndex((todo) => {
        return todo.id == id;
    });
    todoList.splice(deleteIndex, 1);
}
