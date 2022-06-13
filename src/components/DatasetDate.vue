<template>
  <span
    class="d-inline-block"
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :title="
      isIncorrectDate()
        ? 'This date is incorrect or incomplete, please contact the data provider.'
        : null
    "
  >
    <span :class="{ 'date-incorrect': isIncorrectDate() }" class="mr-1" :title="filterDateFormatEU">{{ filterDateFromNow }}</span>
    <font-awesome-icon
      v-if="isIncorrectDate()"
      class="date-incorrect-exclamation-triangle"
      :icon="['fas', 'exclamation-triangle']"
    />
  </span>
</template>

<script>
import dateFilters from '../filters/dateFilters';

export default {
  props: ['date'],
  computed: {
    filterDateFormatUS() {
      return dateFilters.formatUS(this.date);
    },
    filterDateFormatEU() {
      return dateFilters.formatEU(this.date);
    },
    filterDateFromNow() {
      return dateFilters.fromNow(this.$i18n, this.date);
    },
  },
  methods: {
    // Checks date plausibility. Returns true, if the date is not plausible.
    isIncorrectDate() {
      // Falsy dates are considered as intentionally blank and are correct.
      if (!this.date) return false;

      try {
        const t = new Date(String(this.date));
        if (t.toISOString().slice(0, 10) !== String(this.date)) {
          this.$root.$emit('date-incorrect');
          return true;
        }
      } catch (err) {
        this.$root.$emit('date-incorrect');
        return true;
      }

      // Dates in the future are incorrect.
      const now = new Date();
      const date = new Date(String(this.date));
      if (date > now) {
        this.$root.$emit('date-incorrect');
        return true;
      }

      return false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // To force event emit
      this.isIncorrectDate();
    });
  },
};
</script>

<style lang="scss" scoped>
.date-incorrect {
  color: #a1a1a1;
}

.date-incorrect-exclamation-triangle {
  color: #ffaa00;
}
</style>
