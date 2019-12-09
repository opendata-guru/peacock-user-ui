<template>
    <div class="row mt-1 mb-3">
      <div class="col-10 offset-1">
        <p>ERROR: THIS PAGE DOES NOT EXIST!</p>
        <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">GO BACK</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>

</style>
