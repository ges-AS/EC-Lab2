<script setup lang="ts">
import { ref } from "vue";
import { Individual, run_ea } from "./ea/main";
import { MutationOperator } from "./ea/mut_op";
import { RecombinationOperator } from "./ea/rec_op";
const rec_op = ref(RecombinationOperator.Arithmetic);
const mut_op = ref(MutationOperator.Gaussion);
const poulation_size = ref(50);
const max_time = ref(500);
const weight = ref(0.4);
const mutation = ref(0.1);
const step_size = ref(0.1);
const result = ref<{
  best_so_far: number[];
  best_current: number[];
}>()
const run = () => {
  let res = run_ea(poulation_size.value, max_time.value, weight.value, mutation.value, step_size.value, rec_op.value, mut_op.value);
  if (typeof (res) !== 'string') {
    let best_so_far = {
      y: res.best_so_far,
      type: 'lines',
      name: "best so far",
    };

    let best_current = {
      y: res.best_current,
      type: 'lines',
      name: "best current",
    };
    let data = [best_so_far, best_current];
    var layout = {
      xaxis: {
        title: 'Evolution Times',

      },
      yaxis: {
        title: 'Fitness value',
        showline: false,
        showgrid: false,
        zeroline: false
      }
    };
    Plotly.newPlot('myDiv', data, layout);
  }
}

let a = new Individual();
let b = new Individual();
console.log(a, b, a.mul_scalar(0.4, 29, 30).add(b.mul_scalar(0.6, 29, 30), 29, 30));
</script>

<template>
  <!-- 标题 -->
  <div class="flex justify-center mt-8">
    <div class="text-4xl font-bold">Sustech Evolurionary Computation 2022 Lab 2</div>
  </div>

  <!-- 个人信息 -->
  <div class="flex justify-center mt-4">
    <div class="text-2xl">Ge Sheng 12132253</div>
  </div>

  <!-- 控制 -->
  <div class="flex justify-center mt-8">
    <!-- rec op参数 -->
    <div>
      <div class="text-xl font-bold">Recombination Operator</div>
      <div class="flex justify-center">
        <button
          class="m-2 bg-blue-300 rounded px-8 py-2 outline outline-offset-2 outline-4"
          :class="rec_op === 0 ? 'outline-blue-500' : 'outline-transparent'"
          @click="rec_op = 0"
        >Arithmetic</button>
      </div>
      <div class="flex justify-center">
        <button
          class="m-2 bg-blue-300 rounded px-8 py-2 outline outline-offset-2 outline-4 outline-blue-500"
          :class="rec_op === 1 ? 'outline-blue-500' : 'outline-transparent'"
          @click="rec_op = 1"
        >Simple Arithmetic</button>
      </div>
      <div class="flex justify-center">
        <button
          class="m-2 bg-blue-300 rounded px-8 py-2 outline outline-offset-2 outline-4 outline-blue-500"
          :class="rec_op === 2 ? 'outline-blue-500' : 'outline-transparent'"
          @click="rec_op = 2"
        >Single Arithmetic</button>
      </div>
    </div>
    <!-- mut op参数 -->
    <div class="ml-8">
      <div class="text-xl font-bold">Mutation Operator</div>
      <div class="flex justify-center">
        <button
          class="m-2 bg-blue-300 rounded px-8 py-2 outline outline-offset-2 outline-4 outline-blue-500"
          :class="mut_op === 0 ? 'outline-blue-500' : 'outline-transparent'"
          @click="mut_op = 0"
        >Gaussian</button>
      </div>
      <div class="flex justify-center">
        <button
          class="m-2 bg-blue-300 rounded px-8 py-2 outline outline-offset-2 outline-4 outline-blue-500"
          :class="mut_op === 1 ? 'outline-blue-500' : 'outline-transparent'"
          @click="mut_op = 1"
        >Cauchy</button>
      </div>
      <div class="flex justify-center">
        <button
          class="m-2 bg-blue-300 rounded px-8 py-2 outline outline-offset-2 outline-4"
          :class="mut_op === 2 ? 'outline-blue-500' : 'outline-transparent'"
          @click="mut_op = 2"
        >Uniform</button>
      </div>
    </div>

    <!-- 数量参数 -->
    <div class="ml-8">
      <div class="flex justify-center">
        <div class="text-xl font-bold">Parameters</div>
      </div>

      <div class="flex justify-between">
        <div class="mr-2 flex flex-col justify-center">Population Size</div>
        <input
          v-model="poulation_size"
          type="number"
          class="rounded outline outline-2 outline-blue-300 p-1 m-1"
        />
      </div>
      <div class="mt-1 flex justify-between">
        <div class="mr-2 flex flex-col justify-center">Max Evaluation</div>
        <input
          v-model="max_time"
          type="number"
          class="rounded outline outline-2 outline-blue-300 p-1 m-1"
        />
      </div>
      <div class="mt-1 flex justify-between">
        <div class="mr-2 flex flex-col justify-center">Weight</div>
        <input
          v-model="weight"
          type="number"
          class="rounded outline outline-2 outline-blue-300 p-1 m-1"
        />
      </div>
      <div class="mt-1 flex justify-between" v-if="mut_op===MutationOperator.Uniform">
        <div class="mr-2 flex flex-col justify-center">Mutation Rate</div>
        <input
          v-model="mutation"
          type="number"
          class="rounded outline outline-2 outline-blue-300 p-1 m-1"
        />
      </div>
      <div class="mt-1 flex justify-between" v-if="mut_op!==MutationOperator.Uniform">
        <div class="mr-2 flex flex-col justify-center">Step Size</div>
        <input
          v-model="step_size"
          type="number"
          class="rounded outline outline-2 outline-blue-300 p-1 m-1"
        />
      </div>
    </div>
    <!-- start 按钮 -->
    <div
      class="ml-8 m-4 rounded-xl bg-green-400 p-4 px-8 flex flex-col justify-center cursor-pointer hover:bg-green-500"
      @click="run"
    >
      <div class="font-black text-gray-50 text-4xl text-center">start</div>
      <div class="font-black text-gray-50 text-4xl text-center">evolution</div>
    </div>
  </div>

  <!-- 图表 -->
  <div class="flex justify-center">
    <div id="myDiv" class="w-3/5"></div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
