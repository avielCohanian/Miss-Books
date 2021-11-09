import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg" :class="msg.type">
            <button @click="closeMsg">X</button>
            <p>{{msg.txt}}</p>
            <router-link  @click.native="closeMsg" to="/book">Back to books page</router-link>
        </div>
    </transition>
    `,
    data() {
        return {
            msg: null,
            myTimeOut: null
        };
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            console.log(msg);
            this.msg = msg;
            this.myTimeOut = setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
        closeMsg() {
            this.msg = null;
            clearTimeout(this.myTimeOut)
                // eventBus.$off('showMsg', this.showMsg);
        }
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    }

};