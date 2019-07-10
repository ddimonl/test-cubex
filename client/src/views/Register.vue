<template>
    <div class="container">
        <div class="form">
            <div class="form__input-group">
                <input type="text" v-model="username" placeholder="Username">
                <input type="text" v-model="email" placeholder="Email">
                <input type="password" v-model="password" placeholder="Password">
            </div>
            <div  class="form__btn-group">
                <router-link :to="{ name: 'Login' }">Sign in</router-link>
                <button @click="signup(username, email, password)">Sign up</button>
            </div>
            <div class="form__errors">
                <ul v-if="errors">
                    <li v-for="(err, k) in errors" :key="k">{{err.msg}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { REGISTER } from '../store/actions.type';

    export default {
        name: "Register",
        data() {
            return {
                username: '',
                email: '',
                password: ''
            }
        },
        methods: {
            signup(username, email, password) {
                this.$store.dispatch(REGISTER, {username, email, password})
                    .then(() => this.$router.push({ name: 'Home' }));
            }
        },
        computed: {
            ...mapState({
                errors: state => state.auth.errors
            })
        }
    }
</script>

<style scoped>

</style>