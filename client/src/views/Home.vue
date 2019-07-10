<template>
    <div>
        <span v-if="isAuthenticated">User: {{currentUser.username}}</span>
        <button @click="logout">Logout</button>
        <button @click="runConverter">Perform transactions</button>
        <span v-if="status">Processing...</span>
        <div v-if="result">
            <span v-for="(val, key) in result" :key="key">{{ key }}: {{ val }}<br></span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { LOGOUT } from '../store/actions.type'
    import { RUN_CONVERTER } from "../store/actions.type";

    export default {
        name: "Home",
        methods: {
            logout() {
                this.$store.dispatch(LOGOUT).then(() => {
                    this.$router.push({ name: "Login" });
                });
            },
            runConverter() {
                this.$store.dispatch(RUN_CONVERTER);
            }
        },
        computed: {
            ...mapGetters(["isAuthenticated", "currentUser", "status", "result", "transactions"])
        }
    }
</script>

<style scoped>

</style>