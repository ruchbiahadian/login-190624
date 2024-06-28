<template>
    <div>
        <h1 class="text-center white">Edit Product</h1>
    </div>

    <table class="table text-center">
        <tbody>
            <tr>
                <td v-if="!this.downloading">Sedang Memproses</td>
            </tr>
            <tr>
                <td v-if="this.downloading">
                    <form>
                        Title: <br><input type="text" v-model="title"><br>
                        Category: <br>
                        <select v-model="category" disabled>
                                <option v-for="(item, index) in categoryProductList" :key="index" :value="item.id">{{ item.name }}</option>
                        </select><br>
                        Description: <br><textarea v-model="description"/><br>
                        Price: <br><input type="number" v-model="price"><br>
                        Image URL: <br><input type="text" v-model="images"><br>
                            <br><button @click="routeToPageHome">Back</button><button class="submit" @click="editData">Submit</button>
                    </form>
                </td>
            </tr>
        </tbody>
    </table>

    

</template>

<script>

export default{
    name: 'Edit',
    data() {
        return {
            mainId: "",
            categoryId: "",
            downloading: false,
            categoryProductList: [],

            title: "",
            price: "",
            description: "",
            category: "",
            images: ""
        }
    },
    methods: {
        getMainId() {

            const url = window.location.href;
            const parts = url.split('/');
            const id = parts[parts.length - 1];

            this.mainId = id;

            this.getProductById(this.mainId);
        },
        getProductById(id){
            const timeout = 500;

            this.$axios.get('products/' + id)
            .then(res => {

                setTimeout(() => {

                    this.downloading = true;
                    let productdata = res.data;
                        
                        this.categoryId = productdata.category.id;
                        this.title = productdata.title;
                        this.price = productdata.price;
                        this.description = productdata.description;
                        this.category = this.categoryId;
                        this.images = this.regex(productdata.images[0])

                        console.log('productdata', productdata)
                        console.log('imag1', this.images)

                     
                }, timeout);

            })
            
            this.downloading = false;

        },
        routeToPageHome(){
            this.$router.push('/home');
        },
        editData(){

            this.$axios.put('products/' + this.mainId, {
                title: this.title,
                price: this.price,
                description: this.description,
                categoryId: this.category,
                images: [this.images]
                }).then(() =>{
                        alert('Data diubah!')
                        this.$router.push({path: '/home'})
                    })            
        },
        getListDataCategory(){
            this.$axios.get('categories')
            .then(res => {
                this.categoryProductList = res.data;
            })
        },
        regex(text) {
            const regex_txt = /https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=tbn:[\w-]+/;
            const cek = text.match(regex_txt);
            if (cek) {
                return cek[0];
            }
            return "";
        }
    },
    mounted(){
        this.getMainId();
        this.getListDataCategory();
    }
}

</script>