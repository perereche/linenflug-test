<template>
  <div class="single-car">
    <h3>{{ car.name }}</h3>
    <p><strong>License:</strong> {{ car.license }}</p>
    <p><strong>Color:</strong> {{ car.color }}</p>
    <p><strong>TÜV</strong>: {{ car.tuv || "No TÜV"}}</p>
  </div>
</template>
  
<script>
  export default {
    name: 'SingleCar',
    props: {
      car: {
        type: Object,
        required: true,
      },
    },
  }
    
</script>
  
<style>
  .single-car {
    margin: 20px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 8px;
  }
</style>