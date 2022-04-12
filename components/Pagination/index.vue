<template>
  <div class="pagination_wrapper" v-if="getPageCount > 1">
    <paginate
      :page-count="getPageCount"
      :prev-text="''"
      :next-text="''"
      :page-range="3"
      :container-class="'className'"
      :click-handler="changeSkip"
    ></paginate>
  </div>
</template>

<script>
import "./style.scss";
export default {
  props: {
    tottalCount: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getPageCount() {
      return Math.ceil(this.tottalCount / this.limit);
    },
  },
  methods: {
    changeSkip(skip) {
      this.$emit("onChange", skip);
    },
  },
};
</script>