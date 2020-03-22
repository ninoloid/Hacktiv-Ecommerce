<template>
  <!-- Footer -->
  <footer style="background: rgba(0,0,0,0.3);">
    <b-container class="text-left">
      <b-row class="pt-4 pb-3" id="ifMobile">
        <b-col lg="6" md="12">
          <h5 class="title">Less Talk, More Click</h5>
          <p>Too busy or don’t want to leave home? We give you solutions. You’re only a couple clicks away from getting the things you need.</p>
        </b-col>
        <b-col lg="3" md="12" class="hiddenInMobile"></b-col>
        <b-col lg="3" md="12" class="hiddenInMobile">
          <b-row><h5 class="title">Category</h5></b-row>
          <b-row><a href="#!">Computer</a></b-row>
          <b-row><a href="#!">Smartphone</a></b-row>
          <b-row><a href="#!">Peripheral</a></b-row>
          <b-row><a href="#!">Accessories</a></b-row>
        </b-col>
      </b-row>
    </b-container>
    <div class="footer-copyright text-center py-3">
      <b-container fluid>
        Copyright &copy; 2020 - Ahmad MSA
      </b-container>
    </div>
  </footer>
  <!-- Footer -->
</template>

<style scoped>
@media (max-width: 1000px) {
  #ifMobile {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .hiddenInMobile {
    display: none;
  }
}
</style>
