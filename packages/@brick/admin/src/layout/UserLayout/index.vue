<template>
  <div class="select-none">
    <img :src="bgimg"
         class="wave" />
    <Navbar />
    <RouterView />
    UserLaylout-footer
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { bg } from "./utils/static";
import { Navbar } from "./components";

export default defineComponent({
  setup() {
    return {};
  },
  components: { Navbar },
  data() {
    return {
      bgimg: bg,
    };
  },
});
</script>

<style scoped lang="scss">
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>