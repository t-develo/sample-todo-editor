<template>
    <section id="todo" style="display: flex; flex-wrap:wrap;">
        <Card
            v-for="todo in todoList"
            :key="todo.id"
            style="width: 30%; margin: 1.5%"
        >
            <template #title>
                {{ todo.title }}
            </template>
            <template #content>
                <p>{{ todo.content }}</p>
                <update-todo :id="todo.id" :title="todo.title" :content="todo.content" :getTodo="getTodo"></update-todo>
                <delete-todo :id="todo.id" :getTodo="getTodo"></delete-todo>
            </template>
        </Card>
        <Toast />
    </section>
</template>

<script>
import UpdateTodo from './UpdateTodo.vue';
import DeleteTodo from './DeleteTodo.vue';

export default {
    name: "ShowTodo",
    components:{
        UpdateTodo,
        DeleteTodo,
        },
    data: function() {
        return {
            todoList: []
        };
    },
    methods: {
        getTodo: function() {
            this.$axios
                .get("/api/todo/list")
                .then((res) => {
                    this.todoList = res.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    mounted: function(){
        this.getTodo();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
