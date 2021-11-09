export default {
    components: {

    },
    template: `
        <section class="review-add"  >
            <h2>Review</h2>
            <form @submit.prevent="sand">
                <input ref="input"  v-model="currReview.fullName" type="text" placeholder="Full Name"  required>                            
                
                <select v-model= "currReview.rate" required>
                <option disabled value="">Please select one</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>

                <input v-model="currReview.date" type="date" >

                <textarea  class="free-txt" v-model="currReview.freeTxt" placeholder="Something in addition" ></textarea>

                <button>send</button>
            </form>


        </section>
    `,
    data() {
        return {
            currReview: {
                fullName: '',
                rate: null,
                freeTxt: '',
                date: null
            }
        };
    },
    created() {},
    mounted() {
        this.$refs.input.focus()
    },
    methods: {
        sand() {
            this.$emit('sandReview', this.currReview)
            this.currReview = {
                fullName: '',
                rate: null,
                freeTxt: '',
                date: null
            }

            console.log(this.currReview);
        }

    },
    computed: {

    },


}