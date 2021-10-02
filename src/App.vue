<template>
    <div id="app">
        <div>
            <img alt="Vue logo" src="./assets/logo.png" />
        </div>
        <TabView>
            <TabPanel header="Todo">
                <show-todo></show-todo>
            </TabPanel>
            <TabPanel header="Add Todo">
                <add-todo></add-todo>
            </TabPanel>
        </TabView>
    </div>
</template>

<script>
import AddTodo from "./components/AddTodo.vue";
import ShowTodo from "./components/ShowTodo.vue";

export default {
    name: "App",
    components: {
        AddTodo,
        ShowTodo,
    },
    data: function() {
        return {
            todoList: [],
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

p {
    word-wrap: break-word;
}
</style>
