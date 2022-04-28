<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 80 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 0H0V8.33333H50V0ZM50 16.6667H0V25H50V16.6667ZM0 41.6667H33.3333V33.3333H0V41.6667ZM58.3333 0V34.0833C57.0417 33.625 55.625 33.3333 54.1667 33.3333C50.8515 33.3333 47.672 34.6503 45.3278 36.9945C42.9836 39.3387 41.6667 42.5181 41.6667 45.8333C41.6667 49.1485 42.9836 52.328 45.3278 54.6722C47.672 57.0164 50.8515 58.3333 54.1667 58.3333C57.4819 58.3333 60.6613 57.0164 63.0055 54.6722C65.3497 52.328 66.6667 49.1485 66.6667 45.8333V8.33333H79.1667V0H58.3333Z"
      fill="white"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "80",
    },
    height: {
      type: String,
      default: "59",
    },
  },
};
</script>

<style>
</style>