<template>
  <div class="flex gap-2 justify-between items-center w-full">
    <div class="flex gap-2">
      <div class="flex items-center gap-1">
        <Skeleton class="w-8 h-8" />
      </div>
      <template v-if="!minimal">
        <div class="flex items-center gap-1">
          <Skeleton class="w-8 h-8" />
        </div>
        <div class="flex items-center gap-1">
          <Skeleton class="w-12 h-8" />
        </div>
      </template>
    </div>
    <div>
      <span>
        <Skeleton class="w-8 h-8" />
      </span>
    </div>
  </div>
</template>
