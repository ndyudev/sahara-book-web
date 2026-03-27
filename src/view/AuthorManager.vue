<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">Quản lý tác giả</h3>
      <router-link to="/admin/authors/create"
        class="btn btn-primary text-white fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm">
        <span class="material-symbols-outlined fs-5">person_add</span> Thêm tác giả
      </router-link>
    </div>

    <div class="card border-0 rounded-4 shadow-sm">
      <div class="card-body p-4 border-bottom d-flex justify-content-between align-items-center">
        <div class="input-group" style="max-width: 350px;">
          <span class="input-group-text bg-light border-0">
            <span class="material-symbols-outlined text-muted fs-5">search</span>
          </span>
          <input v-model="searchQuery" type="text" class="form-control bg-light border-0 ps-0" placeholder="Search...">
        </div>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light text-muted small text-uppercase">
              <tr>
                <th class="ps-4 py-3">ID</th>
                <th>Ảnh</th>
                <th>Tên tác giả</th>
                <th>Quốc tịch</th>
                <th>Số tác phẩm</th>
                <th class="text-end pe-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="author in filteredAuthors" :key="author.id">
                <td class="ps-4 fw-bold text-muted">#{{ author.id }}</td>
                <td>
                  <img :src="author.image" alt="Author" class="rounded-circle"
                    style="width: 40px; height: 40px; object-fit: cover;">
                </td>
                <td>
                  <div class="fw-bold text-dark">{{ author.name }}</div>
                </td>
                <td>{{ author.nationality }}</td>
                <td>
                  <span class="bg-opacity-10 text-dark">
                    {{ author.bookCount }} sách
                  </span>
                </td>
                <td class="text-end pe-4">
                  <router-link :to="'/admin/authors/' + author.id"
                    class="btn btn-sm btn-light text-primary rounded-circle p-2">
                    <span class="material-symbols-outlined fs-6 d-block">visibility</span>
                  </router-link>
                  <button @click="deleteAuthor(author.id, author.name)"
                    class="btn btn-sm btn-light text-danger rounded-circle p-2 ms-2" title="Xóa tác giả">
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
  name: "AuthorManager",
  data() {
    return {
      searchQuery: "",
      authors: []
    };
  },
  mounted() {
    const savedAuthors = localStorage.getItem('authors');
    if (savedAuthors) {
      this.authors = JSON.parse(savedAuthors);
    } else {
      const defaultData = [
        { id: "A01", name: "Dale Carnegie", nationality: "Hoa Kỳ", bookCount: 15, image: "/authors/auth1.png" },
        { id: "A02", name: "Robin Sharma", nationality: "Canada", bookCount: 22, image: "/authors/auth2.png" },
        { id: "A03", name: "Nguyễn Nhật Ánh", nationality: "Việt Nam", bookCount: 50, image: "/authors/auth3.png" },
        { id: "A04", name: "Haruki Murakami", nationality: "Nhật Bản", bookCount: 18, image: "/authors/auth4.png" },
        { id: "A05", name: "J.K. Rowling", nationality: "Anh Quốc", bookCount: 12, image: "/authors/auth5.png" }
      ];
      this.authors = defaultData;
      localStorage.setItem('authors', JSON.stringify(defaultData));
    }
  },
  computed: {
    filteredAuthors() {
      const query = this.searchQuery.toLowerCase();
      return this.authors.filter(author => {
        return (
          author.name.toLowerCase().includes(query) ||
          author.nationality.toLowerCase().includes(query)
        );
      });
    }
  },
 
  methods: {
    deleteAuthor(id, name) {

      if (confirm(`Sếp có chắc muốn xóa tác giả "${name}" không?`)) {
        
        let list = JSON.parse(localStorage.getItem('authors')) || [];

        const newList = list.filter(auth => auth.id !== id);

        localStorage.setItem('authors', JSON.stringify(newList));

        this.authors = newList;

        alert("Đã xóa tác giả thành công sếp nhé!");
      }
    }
  }

};
</script>