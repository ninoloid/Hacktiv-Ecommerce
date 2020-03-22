<template>
  <div>
    <b-jumbotron fluid container-fluid class="pt-2 pb-0" style="background: rgba(0,0,0,0)">
      <b-row>
        <b-col md=8 sm=12>
          <!-- card -->
          <MainCard />
          <!-- end of card -->
        </b-col>
        <b-col md=4 sm=12>
          <!-- carousel -->
            <MainCarousel />
          <!-- end of carousel -->
        </b-col>
      </b-row>
    </b-jumbotron>
    <b-jumbotron fluid container-fluid class="pt-2 pb-0" style="background: rgba(0,0,0,0)">
      <img src="https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/Betafox_E-Commerce/ASUS_BANNER.jpg">
    </b-jumbotron>
  </div>
</template>

<script>
import MainCarousel from '@/components/MainCarousel'
import MainCard from '@/components/MainCard'
export default {
  name: 'Home',
  components: {
    MainCarousel,
    MainCard
  }
}
</script>
