<template>
    <div class="deleteTodo">
            <Button @click="deleteTodo()" label="削除" />
        <Toast />
    </div>
</template>

<script>
export default {
    name: "DeleteTodo",
    props: {
        id: {
            type: String,
            require: true
        },
    getTodo: {
        type: Function,
        require: true
    }
    },
    methods: {
        deleteTodo: function() {
            this.$axios
            .post("/api/todo/delete",{
                id: this.id
            }).then((res)=>{
                console.log(res);
                this.$toast.add({
                        severity:"success",
                        summary: "Delete todo success.",
                        detail: "",
                        life: 3000
                    });
                    this.getTodo();
            }).catch((error)=>{
                this.$toast.add({
                        severity: "error",
                        summary: "Delete todo error.",
                        detail: error,
                        life: 3000
                    });
            })
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
