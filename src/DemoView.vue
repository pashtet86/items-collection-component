<template>
  <div id="app">
    <img width="15%" src="./assets/logo.png">

    <h2>Basic mode</h2>
    <items-list v-model="items" name="cars"/>

    <h2>Object mode</h2>
    <items-list v-model="objectsPool" showKey="title" name="companies" v-validate="'required'" />

    <button @click="submit">Submit</button>
  </div>
</template>

<script>
import ItemsList from "./ItemsList";

export default {
  name: "Demo-view",
  components: {
    ItemsList
  },
  data() {
    return {
      items: ["Car", "Plane"],
      objectsPool: [{ title: "Toyota", id: 1 }, { title: "Honda", id: 1 }]
    };
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          console.log("submit");
        } else {
          console.log("check errors");
        }
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;

  align-items: center;

  img {
    flex-shrink: 0;
    margin-bottom: 30px;
  }

  button {
    padding: 10px 25px;
    background: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 1px 1px 2px #eee;
  }
}
</style>
