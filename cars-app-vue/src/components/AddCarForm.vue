<template>
  <form @submit.prevent="handleSubmit" class="form-car">
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="car.name" type="text" required>
    </div>
    <div>
      <label for="license">License:</label>
      <input id="license" v-model="car.license" type="text">
    </div>
    <div>
      <label for="color">Color:</label>
      <input id="color" v-model="car.color" type="text" required>
    </div>
    <div>
      <label for="tuv">TUV:</label>
      <input id="tuv" v-model="car.tuv" type="date">
    </div>
    <button type="submit" class="btn-submit">Add</button>
  </form>
</template>
  
<script>
  export default {
    data() {
      return {
        car: {
          name: '',
          license: '',
          color: '',
          tuv: '',
        },
      };
    },
    methods: {
      handleSubmit() {
        this.$emit('add-single-car', this.car);
        this.car = { name: '', license: '', color: '', tuv: '' }; // Reset form
      },
    },
  };
</script>

<style>
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input[type="text"],
  input[type="date"] {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
  }
  .btn-submit {
    background-color: #4CAF50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }
  .btn-submit:hover {
    background-color: #45a049;
  }
</style>