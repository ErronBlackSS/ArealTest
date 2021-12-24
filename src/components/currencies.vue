<template>
  <div>
    <div>
      <span>Choose base currency:  </span>
      <select v-model="selected[0]" @change="Change">
       <option v-for="(value, i) in countries" :key="i">
          {{ value }}
        </option>
      </select>
    </div>
    <ol class="rounded">
      <li v-for="value in valutes" :key="value.id">
        {{value.Nominal}} {{ value.CharCode }} - {{ (value.result).toPrecision(5) }} {{base_currency}}.
        <span :style="getColor(value)">{{ getChange(value) }}</span>
      </li>
    </ol>
  </div>
</template>

<script>


const axios = require('axios').default;

export default {
  name: 'currencies',
  data() {
    return {
      const_currencies: {},
      base_currency: 'RUB',
      selected: ['RUB','RUB'],
      countries: ['RUB'],
      valutes: {}
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
            this.valutes[code]['result'] = this.valutes[code].Value;
            this.valutes[code]['prev_result'] = this.valutes[code].Previous;
          }
        })
        .catch(error => {
          console.log(error)
        })
  },
  methods: {
      Change() {
        this.base_currency = this.selected[0];
        let defaultValute = {
          Value: 1,
          Nominal: 1,
          Previous: 1,
          prev_result: 1,
          result: 1
        };
        // First selected valute details
        let firstValute = this.valutes[this.base_currency] ?? defaultValute
        let firstValuteNominal = firstValute.Nominal;
        let firstValuteValue = firstValute.Value;
        console.log(firstValute)
        let firstValutePrevValue = firstValute.Previous ?? defaultValute;
        for(let cur in this.valutes) {

          // Second selected valute details
          let secondValute = this.valutes[cur] ?? defaultValute;
          let secondValuteValue = secondValute.Value;
          let secondValuteNominal = secondValute.Nominal;

          let secondValutePrevValue = secondValute.Previous ?? defaultValute;

          // Result calculating
          let result =  (secondValuteValue / secondValuteNominal) / (firstValuteValue / firstValuteNominal);
          let prev_result = (secondValutePrevValue / secondValuteNominal) / (firstValutePrevValue / firstValuteNominal);
          // Rounding to ten thousandths
          this.valutes[cur].prev_result = prev_result * secondValuteNominal;
          this.valutes[cur].result =  result ? (result) * secondValuteNominal : null;
        }
      },
      getChange(value) {
          if(value.result - value.prev_result < 0) {
            return (value.result - value.prev_result).toPrecision(4);
          }
          else {
            return '+' + ((value.result - value.prev_result).toPrecision(4));
          }
      },
      getColor(value) {
        if(value.result - value.prev_result < 0) {
          return 'color: red'
        }
        else {
          return 'color: green'
        }
      }
  }
}
</script>

<style scoped>
.rounded li
{
  position: relative;
  display: block;
  padding: .4em .4em .4em 2em;
  margin: .5em 0;
  background: #DAD2CA;
  color: #444;
  text-decoration: none;
  border-radius: .3em;
  transition: .3s ease-out;
}
.rounded
{
  counter-reset: li;
  list-style: none;
  font: 14px "Trebuchet MS", "Lucida Sans";
  padding: 0;
  text-shadow: 0 1px 0 rgba(255,255,255,.5);
}
.rounded li:hover
{
  background: #E9E4E0;
}
.rounded li:hover:before
{
  transform: rotate(360deg);
}
.rounded li:before
{
  content: counter(li);
  counter-increment: li;
  position: absolute;
  left: -1.3em;
  top: 50%;
  margin-top: -1.3em;
  background: #8FD4C1;
  height: 2em;
  width: 2em;
  line-height: 2em;
  border: .3em solid white;
  text-align: center;
  font-weight: bold;
  border-radius: 2em;
  transition: all .3s ease-out;
}
</style>