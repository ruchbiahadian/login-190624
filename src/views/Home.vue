<template>
    <div>
        <h1 class="text-center white">Anda Telah Berhasil Login!</h1>
        <table class="table text-center">
            <thead>
                <tr>
                    <td>No.</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td class="desc">Description</td>
                    <td class="category">Category</td>
                    <td colspan="3" class="img">Image</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="8" v-if="!this.downloading">Sedang mengunduh data</td>
                </tr>
                <tr v-for="(item, index) in dataProductList" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ item.title}}</td>
                    <td>{{ item.price}}</td>
                    <td class="desc">{{ item.description}}</td>
                    <td class="category">{{ item.category}}</td>
                    <td class="img"><img :src="item.image1" alt="" style="width: 100px;"></td>
                    <td class="img"><img :src="item.image2" alt="" style="width: 100px;"></td>
                    <td class="img"><img :src="item.image3" alt="" style="width: 100px;"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default{
    name: 'Home',
    data() {
        return {
            downloading: false,
            dataProductList: []
        }
    },
    methods: {
        getListDataProduct(){
            const timeout = 500;

            this.$axios.get('products?offset=0&limit=10')
            .then(res => {

                setTimeout(() => {

                    this.downloading = true;
                    let productdata = res.data;

                    productdata.forEach(item =>{
                        this.dataProductList.push({
                            'id': item.id?item.id:-1,
                            'title': item.title?item.title:'no title',
                            'price': item.price?item.price:0,
                            'description': item.description?item.description:'no description',
                            'category': item.category.name?item.category.name:'no category',
                            'image': item.category.image?item.category.image:'no image',
                            'image1': item.images[0]?item.images[0]:'no image',
                            'image2': item.images[1]?item.images[1]:'no image',
                            'image3': item.images[2]?item.images[2]:'no image',
                        })
                    })
                     
                }, timeout);

            })
            
            this.downloading = false;

        }
    },
    mounted() {
        this.getListDataProduct();
    }
}
</script>