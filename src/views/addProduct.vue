<template>
    <div>
        <h1 class="text-center white">Add Product</h1>
    </div>

    <table class="table text-center">
        <tbody>
            <tr>
                <td>
                    <form>
                        Title: <br><input type="text" v-model="title"><br>
                        Category: <br>
                        <select v-model="category">
                                <option v-for="(item, index) in categoryProductList" :key="index" :value="item.id">{{ item.name }}</option>
                        </select><br>
                        Description: <br><textarea v-model="description"/><br>
                        Price: <br><input type="number" v-model="price"><br>
                        Image URL: <br><input type="text" v-model="images"><br>
                        <br><button @click="routeToPageHome">Back</button><button class="submit" @click="addData">Submit</button>
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
            dataProduct: [],
            categoryProductList: [],

            title: "",
            price: "",
            description: "",
            category: "",
            images: ""
        }
    },
    methods: {
        routeToPageHome(){
            this.$router.push('/home');
        },
        addData(){

            this.$axios.post('products/' + this.mainId, {
                title: this.title,
                price: this.price,
                description: this.description,
                categoryId: this.category,
                images: [this.images]
                }).then(() =>{
                    alert('Data ditambah!')
                    this.$router.push({path: '/home'})
                })            
        },
        getListDataCategory(){
            this.$axios.get('categories')
            .then(res => {
                this.categoryProductList = res.data;
                console.log(this.categoryProductList)
            })
        },
    },
    mounted(){
        this.getListDataCategory();
    }
}

</script>