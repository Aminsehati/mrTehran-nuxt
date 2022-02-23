<template>
  <button @click="$emit('onClick')" :class="classesButton">
    <slot />
  </button>
</template>

<script>
import "./style.scss";
export default {
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    secondary:{
      type:Boolean,
      default:false,
    },
    small:{
      type:Boolean,
      default:false,
    }
  },
  computed: {
    classesButton() {
      return [
        "btn",
        {
          "btn-primary": this.primary,
          'btn-secondary':this.secondary,
          'btn-small':this.small
        },
      ];
    },
  },
};
</script>

<style>
</style>