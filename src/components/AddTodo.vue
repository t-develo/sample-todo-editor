<template>
    <div class="addTodo">
        <div>
            <span>Title:</span>
            <InputText type="text" v-model="addTitle" />
        </div>
        <div>
            <span>Content:</span>
            <InputText type="text" v-model="addContent" />
        </div>
        <Button @click="addTodo()" label="Todoを追加する" />
        <Toast />
    </div>
</template>

<script>
export default {
    name: "AddTodo",
    data: function() {
        return {
            addTitle: "",
            addContent: "",
        };
    },
    methods: {
        addTodo: function() {
            const data = {
                id: "7",
                title: this.addTitle,
                content: this.addContent,
            };
            this.$axios
                .post("/api/todo/add", data)
                .then((res) => {
                    console.log(res);
                    this.$toast.add({
                        severity:"success",
                        summary: "Add todo success.",
                        detail: "",
                        life: 3000
                    });
                })
                .catch((error) => {
                    this.$toast.add({
                        severity: "error",
                        summary: "Add todo error.",
                        detail: error,
                        life: 3000
                    });
                });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
