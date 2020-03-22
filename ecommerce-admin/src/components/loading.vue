<template>
  <div class="loadingContainer">
    <circle4 style="width: 100px; height: 100px;"></circle4>
    <h3 style="margin-left: 2rem; color: coral;">Please wait ...</h3>
  </div>
</template>

<script>
import { Circle4 } from 'vue-loading-spinner'

export default {
  components: {
    Circle4
  }
}
</script>

<style scoped>
.loadingContainer {
  width: 100%; height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgb(70, 70, 70);
  z-index: 100;
}

.registerItem {
  margin-bottom: 0;
}

.loginBox {
  margin-bottom: 0;
}

@media (max-width: 992px) {
  .loginImage {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .loginBox {
    margin: 0;
  }

  .mainLogin {
    padding: 0.5rem;
  }

  .linkLabel {
    display: none;
    color: red;
  }

  .labelContainer {
    font-size: 0.9rem;
  }

  .loginImage {
    display: none;
  }
}
</style>
