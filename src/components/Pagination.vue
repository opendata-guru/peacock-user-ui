<template>
  <ul class="pagination">
    <li class="page-item">
      <button class="page-link prev-button"
              @click="pageClickedHandler(getPage - 1)">{{ prevButtonText }}
      </button>
    </li>
    <li class="page-item"
        v-for="page in getPagesDisplayed(getPage, pageCount)"
        :class="{ 'active': page === getPage}"
        @click="pageClickedHandler(page)">
      <button class="page-link">{{ page }}</button>
    </li>
    <li class="page-item">
      <button class="page-link next-button"
              @click="pageClickedHandler(getPage + 1)">{{ nextButtonText }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  components: {},
  props: {
    /** Function that will be called after a pagination item has been clicked */
    clickHandler: {},
    /** Amount of items in total */
    itemsCount: {
      type: Number,
      default: () => 0,
    },
    /** Amount of items displayed on one page */
    itemsPerPage: {
      type: Number,
      default: () => 0,
    },
    /** The label for the 'next page' buttion */
    nextButtonText: {
      type: String,
      default: 'Next',
    },
    /** The label for the 'previous page' buttion */
    prevButtonText: {
      type: String,
      default: 'Prev',
    },
    getPage: {
      type: Number,
      default: () => 1,
    },
  },
  data() {
    return {
      pagesDisplayed: [],
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.itemsCount / this.itemsPerPage);
    },
  },
  methods: {
    /**
     * @description Determines displayed pagenumbers and delimiters in the pagination.
     * @param currentPage {number} The currently active page.
     * @param lastPage {number} The number of the last page (also the pageCount).
     * @returns {array}
     */
    getPagesDisplayed(currentPage, lastPage) {
      const current = currentPage;
      const last = lastPage;
      const delta = 2;
      const left = current - delta;
      const right = current + delta + 1;
      const range = [];
      const rangeWithDots = [];
      let l;

      for (let i = 1; i <= last; i += 1) {
        if (i === 1 || i === last || (i >= left && i < right)) {
          range.push(i);
        }
      }

      for (const i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }
      return rangeWithDots;
    },
    /**
     * @description Handler function which is called when a pagination item is clicked.
     *              Checks whether the given page is a number and if it´s first/last page to react properly.
     * @param page {number}
     */
    pageClickedHandler(page) {
      if (typeof page === 'number') {
        if (page > 0 && page <= this.pageCount) {
          this.clickHandler(page);
        }
      }
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

</style>
