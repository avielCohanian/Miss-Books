export default {
    props: ['book'],
    template: `
        <div class="book-preview">
        <img :src="book.thumbnail" alt="">
            <h3> Title: <span>{{book.title}}</span></h3>
            <p>Subtitle: {{book.subtitle}}</p>
            <p :class="priceStyle">Amount : {{currencyIcon}}</p>
            <router-link :to="'/book/'+book.id" >Details</router-link>
        </div>
    `,
    computed: {

        currencyIcon() {
            const currency = new Intl.NumberFormat('en', {
                style: 'currency',
                currency: this.book.listPrice.currencyCode,
                currencySign: 'accounting'
            }).format(this.book.listPrice.amount);
            return currency
        },
        priceStyle() {
            const amount = this.book.listPrice.amount
            return { red: amount > 150, green: amount < 20 }
        },
    },
}