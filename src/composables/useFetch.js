import { ref } from 'vue';

const useFetch = (url) => {
    const data = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const params = ref({})

    const fetchData = async () => {
        loading.value = true;
        try {
            const urlString = `${url}?${parseParams()}`;
            const response = await fetch(urlString);
            const jsonData = await response.json();
            data.value = jsonData;
            loading.value = false;
        } catch (error) {
            error.value = error;
            loading.value = false;
        }
    };

    const parseParams = () => {
        return Object.keys(params.value).map(key => {
            return `${key}=${params.value[key]}`;
        }).join('&');
    }

    return { data, loading, error, fetchData, params };
};

export default useFetch;