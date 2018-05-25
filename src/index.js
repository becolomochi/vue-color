import './style.scss';
import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
      message: 'Hello Vue!',
      h: 10,
      s: 50,
      l: 50
  },
  methods: {
      calcMax: function () {
          //return ((this.s/100 * (1 - Math.abs(2*this.l/100-1))) / 2 + this.l/100)*100
          return this.s * (100 - Math.abs(2 * this.l - 100)) / 100 / 2 + parseInt(this.l)
      },
      calcMin: function () {
          return - this.s * (100 - Math.abs(2 * this.l - 100)) / 100 / 2 + parseInt(this.l)
      },
      hslToRgb: function () {
          let max = this.calcMax();
          let min = this.calcMin();
          let arr = [];
          // [r, g, b]
          if (this.h >= 0 && this.h < 60) {
              arr = [max, (max - min) * (this.h / 60) + min, min];
          } else if (this.h >= 60 && this.h < 120) {
              arr = [(max - min) * ((120 - this.h) / 60) + min, max, min];
          } else if (this.h >= 120 && this.h < 180) {
              arr = [min, max, (max - min) * ((this.h - 120) / 60) + min];
          } else if (this.h >= 180 && this.h < 240) {
              arr = [min, (max - min) * ((240 - this.h) / 60) + min, max];
          } else if (this.h >= 240 && this.h < 300) {
              arr = [(max - min) * ((this.h - 240) / 60) + min, min, max];
          } else if (this.h >= 300 && this.h <= 360) {
              arr = [max, min, (max - min) * ((360 - this.h) / 60) + min];
          } else {
              arr = [max, max, max];
          }
          for (let i = 0; i < arr.length; i++) {
              arr[i] = arr[i] * 255 / 100;
          }
          return arr;
      },
  },
  computed: {
      r: function () {
          let rgb = this.hslToRgb();
          return Math.round(rgb[0]);
      },
      g: function () {
          let rgb = this.hslToRgb();
          return Math.round(rgb[1]);
      },
      b: function () {
          let rgb = this.hslToRgb();
          return Math.round(rgb[2]);
      },
      colorcode: function () {
          let hex_r = ('0' + this.r.toString(16)).slice(-2);
          let hex_g = ('0' + this.g.toString(16)).slice(-2);
          let hex_b = ('0' + this.b.toString(16)).slice(-2);

          return '#' + hex_r + hex_g + hex_b;
      }
  }
})
