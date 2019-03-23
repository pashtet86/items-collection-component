<template>
  <div class="itemslist">
    <label v-html="label"/>
    <div class="itemslist__control">
      <div class="formitem">
        <input
          type="text"
          v-model.trim="item"
          placeholder="Enter name"
          :name="`${name}-input`"
          :ref="`${name}-input`"
          :class="{ error: errors.has(name) }"
          @keyup.enter="addItem"
        >
      </div>
      <button
        v-text="'Add'"
        class="btn filled sm"
        :disabled="!item.length"
        @click.prevent="addItem"
      />
    </div>
    <div class="error" v-if="errors.has(name)" v-html="`<b>${name}</b> field is required`"/>
    <div class="itemslist__items">
      <transition-group tag="ul" name="item">
        <li v-for="(item, i) in itemsList" :key="i" class="list-item">
          <span v-if="showKey">{{ item[showKey] }}</span>
          <span v-else>{{ item }}</span>
          <i @click.prevent="deleteItem(i);" v-html="'&times;'"/>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "items-list",

  inject: ["$validator"],

  data() {
    return {
      item: "",
      itemsList: []
    };
  },

  props: {
    name: {
      default: "items-list"
    },
    showKey: {
      type: String,
      default: ""
    },
    value: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ""
    }
  },

  mounted() {
    this.updateData(); // test it
  },

  watch: {
    value(val) {
      this.updateData(); // test it
    }
  },

  methods: {
    updateData() {
      this.itemsList = [...this.value]; // test it
    },

    addItem() {
      const { showKey, item } = this;
      const i = showKey ? { [showKey]: item } : item; // set plain text or object depending on if shoKey set

      if (!this.isDublicated(item)) {
        this.itemsList.push(i);
        this.item = "";
        this.updateParent();
        this.focus();
      } else {
        alert("the item is already added");
      }
    },

    isDublicated() {
      let result = false;
      const { showKey, item } = this;

      this.itemsList.forEach(it => {
        const i = showKey ? it[showKey] : it;
        if (i === item) {
          result = true;
        }
      });
      return result;
    },

    deleteItem(i) {
      this.itemsList.splice(i, 1);
      this.updateParent();
      this.focus();
    },

    updateParent() {
      this.$emit("input", this.itemsList); // v-model
    },

    focus() {
      this.$refs[`${this.name}-input`].focus();
    }
  }
};
</script>

<style lang="scss">
@import "./styles.scss";
</style>
