<template>
    <router-view></router-view>
</template>

<style>
    body {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100%;
        background-color: #e6e6e6;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form {
        min-width: 320px;
        width: 30%;
        display: flex;
        flex-direction: column;
    }

    .form__input-group {
        display: flex;
        flex-direction: column;
    }

    .form__btn-group {
        display: flex;
        justify-content: space-between;
    }

    input {
        margin: 5px 0;
    }

    .form__errors ul {
        color: #ff0000;
        padding: 0;
    }

</style>

<script>

</script>
