<template>
  <div class="convertion-main">
    <p>I have</p>
      <input v-on:input="convert" v-model="inputed" v-rules="rules">
        <span class="bar"></span>

    <select v-model="selected[0]" @change="convert">
      <option v-for="(value, i) in countries" :key="i">
        {{value}}
      </option>
    </select>
    <p>=</p>
    <p>I want</p>
    <input v-model="result" readonly>
    <span class="bar"></span>

    <select v-model="selected[1]" @change="convert">
      <option v-for="(value, i) in countries" :key="i">
        {{value}}
      </option>
    </select>

  </div>
</template>

<script>

const axios = require('axios').default;

export default {
  name: "converter",
  data() {
    return {
      valutes: {},
      selected: ['RUB', 'USD'],
      inputed: "",
      result: null,
      countries: ['RUB'],
      rules: {
        onlyNumbers: (value) => {
          const pattern = /^\d+$/.test(value);
          if (!pattern) this.inputed = this.inputed.replace(/\D/g, '');
          return true;
        }
      }
    }

  },
  mounted() {
    // Request to API URL, getting response
    axios
        .get('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(response => {
          this.valutes = response.data.Valute;
          // Adding all charCodes to array
          for (let code in response.data.Valute) {
            this.countries.push(code)
          }
        })
        .catch(error => {
          console.log(error)
        })
  },
  methods: {
    convert() {
      let defaultValute = {
        Value: 1,
        Nominal: 1
      };
      // First selected valute details
      let firstValute = this.valutes[this.selected[0]] ?? defaultValute,
          firstValuteValue = firstValute.Value * Number(this.inputed),
          firstValuteNominal = firstValute.Nominal;
      // Second selected valute details
      let secondValute = this.valutes[this.selected[1]] ?? defaultValute,
          secondValuteValue = secondValute.Value,
          secondValuteNominal = secondValute.Nominal;
      // Result calculating
      let result = (firstValuteValue / firstValuteNominal) / (secondValuteValue / secondValuteNominal);
      // Rounding to ten thousandths
      this.result = result ? result.toFixed(5) : null;
    }
  }
}
</script>

<style scoped>
.convertion-main {
  background: aliceblue;
  display: block;
  padding-top: 2%;
  padding-left: 40%;
  padding-right: 40%;
}
input {
  border: 1px solid #cccccc;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  background: #ffffff !important;
  outline: none;
  height: 24px;
  width: 120px;
  color: black;
  font-size: 11px;
  margin-left: 1%;
  margin-right: 1%;
}
select {
  margin-right: 1%;
}
p {
  margin-bottom: 0;
  padding-left: 1%;
}
</style>