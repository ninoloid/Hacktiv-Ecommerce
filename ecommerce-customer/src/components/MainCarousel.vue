<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="200"
      img-height="260"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide img-src="https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/razer_headphone.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/asus_rog.jpg"></b-carousel-slide>
      <b-carousel-slide img-src="https://s3-ap-southeast-1.amazonaws.com/assets.muhammadsatriaadiputra.digital/assets/blackshark.jpg"></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
