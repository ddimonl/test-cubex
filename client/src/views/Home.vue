<template>
    <div>
        <button @click="runConverter">Perform transactions</button>
        <span v-if="isProcessing">Processing...</span>
    </div>
</template>

<script>
    import config from '../common/config'
    import Vue from 'vue'

    export default {
        name: "Home",
        data() {
            return {
                transactions: [],
                isProcessing: false
            }
        },
        methods: {
            async runConverter() {
                this.isProcessing = true;
                const promiseArray = [];
                let result;

                for (let i = 0; i < config.transactionsCount; i++) {
                    promiseArray.push(this.processTransaction());
                }

                try {
                    await Promise.all(promiseArray);
                    result = await Vue.axios.post(config.postTransactionUrl, { transactions: this.transactions })
                } catch (err) {
                    console.error(err);
                }
                this.isProcessing = false;
                console.log("RESULT");
                console.log(result);
            },
            async processTransaction() {
                const transaction = await Vue.axios.get(config.getTransactionUrl);

                const tDate = new Date(transaction.data.createdAt);

                const exchangeUrl = `${config.exchangeServiceUrl}/${tDate.getFullYear()}-${tDate.getMonth() + 1}-${tDate.getDate()}?base=${config.convertingBase}`;

                const exchangeResults = await Vue.axios.get(exchangeUrl);

                const {createdAt, currency, amount, checksum} = transaction.data;

                const convertedAmountRaw = amount / exchangeResults.data.rates[transaction.data.currency];
                const convertedAmount = parseFloat(convertedAmountRaw.toFixed(4));

                this.transactions.push({createdAt, currency, amount, convertedAmount, checksum});
            }
        }
    }
</script>

<style scoped>

</style>