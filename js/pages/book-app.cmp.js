import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookDetails from './book-details.cmp.js';
import bookAdd from './book-add.cmp.js';


export default {
    components: {
        bookList,
        bookFilter,
        bookDetails,
        bookAdd
    },
    template: `
        <section class="book-app" v-if="books">
        
            <div v-if="!selectedBook">

            <router-link to="/book/add">Add Book</router-link>
         
            <book-filter @filtered="setFilter"></book-filter>
        
            <book-list :books="booksToShow" @selected="selectBook"></book-list>

            <p v-if="!booksToShow.length">No Results</p>

            </div>

            <book-details v-if="selectedBook" :book="selectedBook" @close="closeDetails"></book-details> 
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            selectedBook: null,
        };
    },
    created() {
        this.loadBook();
    },
    methods: {
        loadBook() {
            bookService.query()
                .then(books => this.books = books);
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        closeDetails() {
            this.selectedBook = null;
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;

            const searchStr = this.filterBy.title.toLowerCase();
            const sortByTitle = this.books.filter(book => {
                return (book.title.toLowerCase().includes(searchStr))
            })

            const minPrice = (this.filterBy.minPrice) ? this.filterBy.minPrice : 0
            const maxPrice = (this.filterBy.maxPrice) ? this.filterBy.maxPrice : Infinity

            const filterBook = sortByTitle.filter(book => {
                return (book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice)
            });


            console.log(filterBook);
            return filterBook;
        },
    },


}