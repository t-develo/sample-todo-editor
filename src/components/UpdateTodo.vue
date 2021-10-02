<template>
  <div class="updateTodo">
    <Button v-if="!isEdit" @click="toggleIsEdit()" label="編集" />
    <div v-if="isEdit">
      <div>
        <span>Title:</span>
        <InputText type="text" v-model="updateTitle" />
      </div>
      <div>
        <span>Content:</span>
        <InputText type="text" v-model="updateContent" />
      </div>
      <Button @click="updateTodo()" label="更新" />
      <Toast />
    </div>
  </div>
</template>

<script>
export default {
  name: "UpdateTodo",
  props: {
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    getTodo: {
        type: Function,
        require: true
    }
  },
  data: function() {
    return {
      updateTitle: this.title,
      updateContent: this.content,
      isEdit: false,
    };
  },
  methods: {
    toggleIsEdit: function() {
      this.isEdit = !this.isEdit;
    },
    updateTodo: function() {
      const data = {
        id: this.id,
        updateObj: {
          title: this.updateTitle,
          content: this.updateContent,
        },
      };
      this.$axios
        .post("/api/todo/update", data)
        .then((res) => {
          console.log(res);
          this.$toast.add({
            severity: "success",
            summary: "Update todo success.",
            detail: "",
            life: 3000,
          });
          this.isEdit = false;
          this.getTodo();
        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "Update todo error.",
            detail: error,
            life: 3000,
          });
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
