<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold mb-0">Quản lý khách hàng</h3>
            <router-link to="/admin/users/create"
                class="btn btn-primary text-white fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm text-decoration-none">
                <span class="material-symbols-outlined fs-5">person_add</span> Thêm mới
            </router-link>
        </div>

        <div class="card border-0 rounded-4 shadow-sm">
            <div class="card-body p-4 border-bottom">
                <div class="input-group" style="max-width: 350px;">
                    <span class="input-group-text bg-light border-0">
                        <span class="material-symbols-outlined text-muted fs-5">search</span>
                    </span>
                    <input v-model="searchQuery" type="text" class="form-control bg-light border-0 ps-0"
                        placeholder="Search....">
                </div>
            </div>

            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light text-muted small text-uppercase">
                            <tr>
                                <th class="ps-4 py-3">ID</th>
                                <th>Khách hàng</th>
                                <th>Liên hệ</th>
                                <th>Ngày tham gia</th>
                                <th>Trạng thái</th>
                                <th class="text-end pe-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in filteredUsers" :key="user.id">
                                <td class="ps-4 fw-bold text-muted">#{{ user.id }}</td>
                                <td>
                                    <div class="d-flex align-items-center gap-3">
                                        <img :src="user.avatar" alt="User" class="rounded-circle"
                                            style="width: 40px; height: 40px; object-fit: cover;">
                                        <div class="fw-bold text-dark">{{ user.name }}</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="small">{{ user.email }}</div>
                                    <div class="text-muted small">{{ user.phone }}</div>
                                </td>
                                <td class="text-muted small">{{ user.joinDate }}</td>
                                <td>
                                    <span class="badge rounded-pill px-3 py-2 fw-semibold"
                                        :class="user.status === 'Hoạt động' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'">
                                        {{ user.status }}
                                    </span>
                                </td>
                                <td class="text-end pe-4">
                                    <router-link :to="'/admin/users/' + user.id"
                                        class="btn btn-sm btn-light text-primary rounded-circle p-2">
                                        <span class="material-symbols-outlined fs-6 d-block">visibility</span>
                                    </router-link>

                                    <button @click="deleteUser(user.id, user.name)"
                                        class="btn btn-sm btn-light text-danger rounded-circle p-2 ms-2"
                                        title="Xóa khách hàng">
                                        <span class="material-symbols-outlined fs-6 d-block">delete</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserManager",
    data() {
        return {
            searchQuery: "",

            users: []
        };
    },

    mounted() {

        const savedUsers = localStorage.getItem('users');

        if (savedUsers) {

            this.users = JSON.parse(savedUsers);
        } else {

            const defaultData = [
                { id: "U001", name: "Châu Nhật Duy", email: "duychau@gmail.com", phone: "090113567", joinDate: "10/01/2025", status: "Hoạt động", avatar: "/avatars/u1.png" },
                { id: "U002", name: "Nguyễn Thế Ngữ", email: "ngunguyen@gmail.com", phone: "0988897666", joinDate: "15/01/2023", status: "Hoạt động", avatar: "/avatars/u2.png" },
                { id: "U003", name: "Lê Hữu Trọng", email: "trongle@gmail.com", phone: "0912645444", joinDate: "02/02/2025", status: "Bị khóa", avatar: "/avatars/u3.png" },
                { id: "U004", name: "Võ Văn Trọng", email: "trongvo@gmail.com", phone: "0977256222", joinDate: "20/02/2024", status: "Hoạt động", avatar: "/avatars/u4.png" },
                { id: "U005", name: "Võ Thị Thúy Ngân", email: "nganvo@gmail.com", phone: "0933792555", joinDate: "05/03/2026", status: "Hoạt động", avatar: "/avatars/u5.png" },
                { id: "U006", name: "Nguyễn Bích Trâm", email: "tramnguyen@gmail.com", phone: "032607672", joinDate: "12/03/2026", status: "Hoạt động", avatar: "/avatars/u6.png" }
            ];

            this.users = defaultData;

            localStorage.setItem('users', JSON.stringify(defaultData));
        }
    },

    computed: {
        filteredUsers() {
            const query = this.searchQuery.toLowerCase();
            return this.users.filter(user => {
                return (
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    user.phone.includes(query)
                );
            });
        }
    },

    methods: {
        deleteUser(id, name) {

            if (confirm(`Sếp có chắc muốn xóa khách hàng "${name}" không?`)) {
                
                let list = JSON.parse(localStorage.getItem('users')) || [];

                const newList = list.filter(u => u.id !== id);

                localStorage.setItem('users', JSON.stringify(newList));

                this.users = newList;

                alert("Đã xóa khách hàng thành công!");
            }
        }
    }
};
</script>