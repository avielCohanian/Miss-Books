import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    components: {
        longText,
        reviewAdd
    },
    template: `
        <section class="book-details" v-if="book">
        <div class="book-details-show">
        <router-link :to="'/book/'+nextBookId"> < Next Book </router-link>
        <router-link :to="'/book/'+prevBookId">Prev Book ></router-link>
            <h3>Book Details: <span v-if="book.listPrice.isOnSale">🔥🔥🔥</span></h3>

            <p>Title: {{book.title}}</p>
            
            <p>Subtitle: {{book.subtitle}}</p>
            
            <long-text :txt="book.description" :previewLength="50"></long-text>

            <p class="price" :class="priceStyle">Price : {{currencyIcon}}</p>
            
            <p>categories: <span v-for="category in book.categories"> {{category}}</span> </p>
            
            <p>authors: <span v-for="author in book.authors"> {{author}}</span> </p>
           
            
            <p>publishedDate: {{book.publishedDate}} <span>{{publishedDate}}</span></p>
            
            <p>pageCount: {{book.pageCount}} <span>{{pageCountToShow}}</span></p>
            
            <img class="sale-img" v-if="book.listPrice.isOnSale" :src=sale alt="">
            
            <router-link to="/book">Back</router-link> 
            
            
            <!-- <div v-if="reviews" class="reviews"> -->
                
                  
                <h3  >reviews:</h3>         
                <ul v-for="(review,idx) in book.reviews" :key="idx">    
                    <a @click="remove(idx)">X</a>            
                    <h4>Name: {{review.fullName}}</h4>             
                    <li>Rate: {{review.rate}}</li>
                    <p style="white-space: pre">{{review.freeTxt}}</p>            
                    <li>Date: {{review.date}}</li>            
            
                </ul>  
            </div>       
            <div>
            <!-- </div> -->
             <img  :src="book.thumbnail" alt="">
    
             <review-add  @sandReview="addReview"></review-add>

        </div>
    </section>
    `,
    data() {
        return {
            book: null,
            reviews: null,
            nextBookId: null,
            prevBookId: null,
        }
    },
    created() {},
    watch: {
        '$route.params.bookId': {
            handler() {
                // const { bookId } = this.$route.params;
                // console.log(bookId);
                // bookService.getById(bookId)
                //     .then(book => this.book = book);


                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => {
                        this.book = book
                        this.bookReviews()
                    })
                bookService.getNextBookId(bookId)
                    .then(bookId => {
                        this.nextBookId = bookId
                    });
                bookService.getPrevBookId(bookId)
                    .then(bookId => {
                        this.prevBookId = bookId
                    });
            },
            immediate: true
        }
    },
    destroyed() {},
    methods: {
        addReview(review) {
            if (!this.book.reviews) this.book.reviews = []
            this.book.reviews.push(review)
            bookService.updateBook(this.book)
                .then(() => {
                    const msg = {
                        txt: 'Review send',
                        type: 'success'
                    };
                    this.reviews = this.book.reviews
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                })
            console.log(this.book.reviews);
        },
        remove(idx) {
            console.log('before', this.book.reviews);
            this.book.reviews.splice(idx, 1)
            bookService.updateBook(this.book)
                .then(() => {
                    console.log(idx);
                    const msg = {
                        txt: 'Deleted successfully',
                        type: 'success'
                    };
                    this.reviews = this.book.reviews
                    eventBus.$emit('showMsg', msg);
                    console.log('after', this.book.reviews);
                    if (!this.reviews.length) this.reviews = null
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                })
        },
        bookReviews() {
            // if (!this.book.reviews.length || !this.book.reviews) this.reviews = null
            // else this.reviews = this.book.reviews
        },

    },
    computed: {

        reviewsTitle() {
            // if (!this.book.reviews) return false
        },

        authorsToShow() {
            //
            // const authors = JSON.parse(JSON.stringify(this.book.authors))
            // console.log(authors)
            // return authors.join(',')
        },
        pageCountToShow() {
            if (this.book.pageCount > 500) return 'Long reading'
            else if (this.book.pageCount > 200) return 'Decent Reading'
            if (this.book.pageCount < 100) return 'Light Reading'
        },
        publishedDate() {
            const year = new Date().getFullYear()
            if ((year - this.book.publishedDate) < 1) return 'New!'
            if ((year - this.book.publishedDate) > 10) return 'Veteran Book'

        },
        priceStyle() {
            const amount = this.book.listPrice.amount
            return { red: amount > 150, green: amount < 20 }
        },
        currencyIcon() {
            const currency = new Intl.NumberFormat('en', {
                style: 'currency',
                currency: this.book.listPrice.currencyCode,
                currencySign: 'accounting'
            }).format(this.book.listPrice.amount);
            return currency
        },
        sale() {
            if (this.book.listPrice.isOnSale) return '../img/Sale.png'
        },
    },

}