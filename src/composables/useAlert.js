import { ref } from 'vue';

const state = ref({
    message: '',
    show: false,
    type: 'alert-success'
});

const useAlert = () => {

    const showAlert = (message, type, time = 2000) => {
        state.value.message = message;
        state.value.show = true;
        state.value.type = type;

        setTimeout(() => {
            state.value.show = false;
        }, time);
    };

    return {
        state,
        showAlert
    };
};

export default useAlert;