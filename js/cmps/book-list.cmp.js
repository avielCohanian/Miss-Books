import bookPreview from './book-preview.cmp.js';

export default {
    components: {
        bookPreview
    },
    props: ['books'],
    template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book" />
            </li>
        </ul>
    `,
    // @click.native="selected(book)"
    methods: {
        selected(id) {
            this.$emit('selected', id)
        }

    },

};