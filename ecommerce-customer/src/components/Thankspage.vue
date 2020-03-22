<template>
  <div style="margin: 100px;">
    <b-card style="background: rgba(0,0,0,.4)">
      <b-card-body style="background: white; font-size: 2rem;">Thank You!</b-card-body>
      <b-card-body style="background: white; margin-top: 20px; font-size: 1.2rem;">Please transfer to one of this bank account before {{ timeLimit }}</b-card-body>
      <b-card-body style="background: white; margin-top: 10px;">
        <b-row>
          <b-col>
            <b-card style="background: rgba(0,0,0,.4)">
              <img src="https://s3-ap-southeast-1.amazonaws.com/iwzl/iwzl-new/bank/071017072133_mandiri.png">
              <p style="margin-top: 2rem; font-size: 1.2rem;">0809 8 9999</p>
            </b-card>
          </b-col>
          <b-col>
            <b-card style="background: rgba(0,0,0,.4)">
              <img src="https://s3-ap-southeast-1.amazonaws.com/iwzl/iwzl-new/bank/071017072039_bca.png">
              <p style="margin-top: 2rem; font-size: 1.2rem;">0809 8 9999</p>
            </b-card>
          </b-col>
          <b-col>
            <b-card style="background: rgba(0,0,0,.4)">
              <img src="https://s3-ap-southeast-1.amazonaws.com/iwzl/iwzl-new/bank/071017072047_bni.png">
              <p style="margin-top: 2rem; font-size: 1.2rem;">0809 8 9999</p>
            </b-card>
          </b-col>
          <b-col>
            <b-card style="background: rgba(0,0,0,.4)">
              <img src="https://s3-ap-southeast-1.amazonaws.com/iwzl/iwzl-new/bank/071017072029_bri.png">
              <p style="margin-top: 2rem; font-size: 1.2rem;">0809 8 9999</p>
            </b-card>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  computed: {
    timeLimit () {
      const date = new Date()
      const hour = date.getHours() + 1
      const min = date.getMinutes()
      return `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}`
    }
  }
}
</script>

<style>

</style>
