<template>
    <div class="views_home">
        <h1>Anda Telah Berhasil Login!</h1>
        <table>
            <thead>
                <tr>
                    <td>nama</td>
                    <td>desceiption</td>
                    <td>price</td>
                    <td>image</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in dataProductList" :key="index">
                    <td>{{ item.name}}</td>
                    <td>{{ item.description}}</td>
                    <td>{{ item.price}}</td>
                    <td><img :src="item.image" alt="" style="width: 100px;"></td>
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
            dataProductList:[]
        }
    },
    mounted() {
        this.getListDataProduct();
    },
    methods: {
        getListDataProduct(){
            this.$axios.get('products')
            .then(res => {

                // this.dataProductList = res.data;
                // console.log('new',res.data)

                let productdata = res.data;

                productdata.forEach(item =>{
                    this.dataProductList.push({
                        'category': item.category?.name,
                        'price': item.price,
                        'name': item.title,
                        'image': item.category?.image,
                        'description': item.description
                    })
                })
                console.log(this.dataProductList)
            })
        }
    },
}
</script>