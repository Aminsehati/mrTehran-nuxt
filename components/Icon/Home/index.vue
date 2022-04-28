<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 88 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M67.65 30L75.3 37.65L70 42.95L37.65 10.6L5.3 42.95L0 37.65L37.65 0L57.65 20V10H67.65V30ZM37.65 17.7L67.65 47.65V77.5H7.65V47.65L37.65 17.7ZM47.65 72.5V47.5H27.65V72.5H47.65Z"
      fill="white"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "76",
    },
    height: {
      type: String,
      default: "78",
    },
  },
};
</script>

<style>
</style>