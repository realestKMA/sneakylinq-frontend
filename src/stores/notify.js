/* eslint-disable */
import { defineStore } from "pinia";
import { reactive } from "vue";


export const useNotify = defineStore("notify", () => {

    ////////////////////////////////////////
    // App notification system :)
    ///////////////////////////////////////
    const notify = reactive({
        open: false,
        title: null,
        details: null,
        type: null
    })

    function showNotify(title, detail, type = 'good', seconds = 5000) {
        // notify user of token expired
        notify.open = true
        notify.title = title
        notify.details = detail
        notify.type = type

        setTimeout(() => {
            notify.open = false
            notify.title = notify.details = notify.type = null
        }, seconds);
    }

    return { notify, showNotify }
})