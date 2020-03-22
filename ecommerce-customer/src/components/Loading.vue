<template>
  <div class="loadingContainer">
    <circle4 style="width: 100px; height: 100px;"></circle4>
    <h3 id="pleaseWait">Please wait ...</h3>
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
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.5)
  }

  #pleaseWait {
    margin-left: 2rem;
    color: coral;
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    #pleaseWait {
      color: coral;
      font-size: 1.3rem;
    }
  }
</style>
