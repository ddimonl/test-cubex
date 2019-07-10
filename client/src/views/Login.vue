<template>
    <div class="container">
        <div class="form">
            <div class="form__input-group">
                <input type="text" v-model="email" placeholder="Email">
                <input type="password" v-model="password" placeholder="Password">
            </div>
            <div class="form__btn-group">
                <router-link :to="{ name: 'Register' }">Sign up</router-link>
                <button @click="login(email, password)">Sign in</button>
            </div>
            <div class="form__errors">
                <ul v-if="errors" class="error-messages">
                    <li v-for="(err, k) in errors" :key="k">{{err.msg}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import { LOGIN } from "../store/actions.type";

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login(email, password) {
                this.$store.dispatch(LOGIN, {email, password})
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