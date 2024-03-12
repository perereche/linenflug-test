<template>
  <h1>Cars</h1>
  <h3>Add a car</h3>
  <div class="form-car-container">
    <AddCarForm @add-single-car="addSingleCar"/>
  </div>
  <h2>Car's list</h2>
  <div class="cars-list">
    <SingleCar
      v-for="car in cars"
      :key="car.id"
      :car="car"
    />
  </div>
</template>
  
<script>
  import CarsService from '@/services/CarsService';
  import SingleCar from './SingleCar.vue';
  import AddCarForm from './AddCarForm.vue';
  
  export default {
    name: 'InventoryCars',
    components: {
     SingleCar,
     AddCarForm
    },
    data() {
      return {
        cars: [],
        newCar: { name: "", license: "", color: "", tuv: "" }
      };
    },
    created() {
      this.getAllCars();
    },
    methods: {
      getAllCars() {
        CarsService.getCars()
          .then(response => {
            this.cars = response.data.cars;
          })
          .catch(error => {
            console.log(error);
          });
      },
      async addSingleCar(car) {
        try {
          await CarsService.addCar(car);
          alert("Car added succesfully");
          this.getAllCars();     
        } catch (error) {
          console.error("Error on adding car", error);
        }
      },
    }
  };
</script>
  
<style>
  h1{
    font-size: 3em;
    color: black;
  }
  .form-car-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
  }
  .cars-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; 
    justify-content: center;
  }
</style>