export default {
    props: ['txt', 'previewLength'],
    template: `
        <header class="long-text">
            <p >Description: {{descriptionToShow}} 

                
                <a v-if="isLongTxt" @click="togglePreview">{{textButton}} </a>
                </p>
        </header>
    `,
    data() {
        return {
            isPreview: true,
        }
    },
    methods: {
        togglePreview() {
            this.isPreview = !this.isPreview
        },
        longTxt() {
            if (isPreview) this.txt1 = 'Read More...'
            else this.txt1 = 'Read Less'
        }
    },
    computed: {
        descriptionToShow() {
            if (!this.isPreview || this.txt.length < this.previewLength) {
                return this.txt
            } else {
                return this.txt.substr(0, this.previewLength)
            }
        },
        textButton() {
            return this.isPreview ? 'Read more...' : 'less'
        },
        isLongTxt() {
            return this.txt.length > 100
        }

    }
}