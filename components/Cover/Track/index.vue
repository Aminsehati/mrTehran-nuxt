<template>
  <div class="cover-track">
    <div class="cover-track-wrapper">
      <div class="image">
        <div class="image__cover">
          <img :src="getImageUrl(trackInfo.imgUrl)" />
        </div>
      </div>
      <div class="content px-20">
        <div class="mb-20 flex items-center">
          <p class="text-12 text-light mr-15 flex items-center">
            <i class="fa-solid fa-calendar-check mr-5"></i>
            {{ trackInfo.createdAt }}
          </p>
          <p class="text-12 text-light mr-15 flex items-center">
            <i class="fa-solid fa-play mr-5"></i>
            {{ trackInfo.view | viewTrack }}
          </p>
          <i class="fa-solid fa-download"></i>
        </div>
        <h2 class="trackName text-22 font-700">
          {{ trackInfo.trackName }}
        </h2>
        <div class="flex actors">
          <p
            v-for="(actor, index) in trackInfo.actors"
            :key="actor._id"
            class="text-light"
          >
            {{ actor.name }}
            {{ trackInfo.actors.length === index + 1 ? "" : "&" }}
          </p>
        </div>
        <div class="btn__group mt-20 flex gap-x-15 gap-y-10 flex-wrap">
          <Button secondary> Playing </Button>
          <Button secondary class="btn__bookMark"> BookMark </Button>
          <Button secondary class="btn__like"> Like </Button>
          <Button secondary class="btn__download"> Download </Button>
          <Button secondary class="btn__share"> Share </Button>
          <Button secondary> Open In App </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./style.scss";
export default {
  props: {
    trackInfo: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    viewTrack(view) {
      let viewLabel = Number(view) > 1000 ? "K" : "";
      return `${view}${viewLabel}`;
    },
  },
};
</script>

<style>
</style>