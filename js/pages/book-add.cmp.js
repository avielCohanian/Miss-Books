import { bookService } from '../services/book-service.js';


export default {
    template: `
        <div class="book-add">
            <input  v-model="bookName" type="text" placeholder="Search for a book">
            <button @click="search">Search</button>
            <ul v-if="bookList">
                    
                <li v-for="book in bookList" :key="book.id">{{book.volumeInfo.title}}
                        <a @click="add(book)">+</a>  

                </li>
            </ul>
            <router-link to="/book">Back</router-link> 

        </div>
        `,
    data() {
        return {
            bookName: null,
            bookList: null
        };
    },
    methods: {
        search() {
            bookService.searchBook(this.bookName)
                .then(books => {
                    console.log(books);
                    this.bookList = books
                })
            console.log('work');
        },
        add(newBook) {
            console.log(newBook);
            bookService.addGoogleBook(newBook)

        }

    }
}