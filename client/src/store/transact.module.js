import { PROCESS_TRANSACT, RUN_CONVERTER } from "./actions.type";
import { ADD_TRANSACT, FETCH_END, FETCH_START } from "./mutations.type";
import config from "../common/config";
import Vue from 'vue';

const state = {
    transactions: [],
    isProcessing: false,
    result: null
};

const actions = {
    async [RUN_CONVERTER](context) {
        context.commit(FETCH_START);
        const promiseArray = [];
        let result;

        for (let i = 0; i < config.transactionsCount; i++) {
            promiseArray.push(context.dispatch(PROCESS_TRANSACT));
        }

        try {
            await Promise.all(promiseArray);
            result = await Vue.axios.post(config.postTransactionUrl, {
                transactions: context.getters.transactions
            })
        } catch (err) {
            console.error(err);
        }

        context.commit(FETCH_END, result.data);
    },
    async [PROCESS_TRANSACT](context) {
        const transaction = await Vue.axios.get(config.getTransactionUrl);
        console.log(transaction);

        const tDate = new Date(transaction.data.createdAt);

        const exchangeUrl = `${config.exchangeServiceUrl}/${tDate.getFullYear()}-${tDate.getMonth() + 1}-${tDate.getDate()}?base=${config.convertingBase}`;

        const exchangeResults = await Vue.axios.get(`${exchangeUrl}`);

        const {createdAt, currency, amount, checksum} = transaction.data;

        const convertedAmountRaw = amount / exchangeResults.data.rates[currency];
        const convertedAmount = parseFloat(convertedAmountRaw.toFixed(4));

        context.commit(ADD_TRANSACT, {createdAt, currency, amount, convertedAmount, checksum})
    }
};

const mutations = {
    [FETCH_START]: (state) => {
        state.isProcessing = true;
        state.result = null;
    },
    [FETCH_END]: (state, result) => {
        state.isProcessing = false;
        state.result = result;
    },
    [ADD_TRANSACT]: (state, t) => state.transactions.push(t),
};

const getters = {
    transactions: (state) => {
        return state.transactions
    },
    result: (state) => {
        return state.result
    },
    status: (state) => {
        return state.isProcessing
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};