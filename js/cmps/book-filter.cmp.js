export default {
    template: `
        <div class="book-filter">
            <button @click="filter">Search</button>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            <input @input="filter" v-model.number="filterBy.minPrice" type="number" placeholder="Min price">
            <input @input="filter" v-model.number="filterBy.maxPrice" type="number" placeholder="Max price">
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: null,
                maxPrice: null,
            }
        };
    },
    methods: {
        filter() {
            console.log(this.filterBy);
            this.$emit('filtered', {...this.filterBy });
        },
    }
}