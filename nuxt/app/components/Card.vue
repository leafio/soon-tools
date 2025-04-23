<template>
  <svg xmlns="http://www.w3.org/2000/svg">
    <filter id="innerShadow">
      <!-- 投影偏移 -->
      <feOffset dx="0" dy="0" />
      <!-- 投影模糊 -->
      <feGaussianBlur stdDeviation="10" result="offset-blur" />
      <!-- 反转投影使其变成内投影 -->
      <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
    </filter>
    <defs>
      <symbol id="card-path">
        <path d="M20 0 L120 0 L150 15 L210 15 L240 35 L240 105 L210 120 L20 120 L0 100 L0 20 Z" />
      </symbol>
    </defs>
    <use xlink:href="#card-path" filter="url(#innerShadow)" fill="#6436b1" />
    <use xlink:href="#card-path" stroke="#6c40c1" stroke-width="2" fill="none" class="animate-path" />
    <foreignObject x="20" y="20" width="200" height="100">

        <slot></slot>
    </foreignObject>
  </svg>
</template>
<style scoped>
.animate-path {
  /* stroke: #05d380; */
  stroke-width: 1;
  stroke-dasharray: 888;
  stroke-dashoffset: 888;
  /* fill: none; */
  animation: go 3s infinite;
}

@keyframes go {
  0% {
    stroke-dashoffset: 888;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
