import { ref, onMounted } from 'vue';


export default function useSearch (searchUser, searchId, type, data) {
    const results = ref([]);

    const searchByName = (searchUser) => {
        results.value = !searchUser ? data : data.filter(part => part.fullName.toLowerCase().includes(searchUser.toLowerCase()));
    }

    const searchById = (searchId) => {
        results.value = !searchId ? data : data.find(part => part.id == searchId);
    }

    onMounted(() => console.log('Mounted: useSearch'));
    if (type == "productName") {
        searchByName(searchUser);
        return { searchResults: results, searchByName: searchByName }
    } else {
        searchById(searchId);
        return { searchResults: results, searchById: searchById }
    }
}