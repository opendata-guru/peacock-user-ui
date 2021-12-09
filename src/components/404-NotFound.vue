<template>
    <div class="row mt-1 mb-3">
      <div class="col-10 offset-1">
        <p>{{ $t('message.error.http404') }}</p>
        <button class="btn btn-sm btn-secondary" @click="$router.go(-1)">{{ $t('message.error.goBack') }}</button>
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
