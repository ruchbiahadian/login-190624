<template>
    <nav>
        <ul>
            <li>
                <RouterLink to="/home">Products</RouterLink>
                <RouterLink to="/addProduct">Add Product</RouterLink>
                <RouterLink to="/category">Categories</RouterLink>
                <!-- <RouterLink to="/about">About</RouterLink> -->
                <button class="red" @click="logout">Logout</button>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default{
        name: 'Navbar',
        methods: {
            logout(){
                this.$store.dispatch('logout', this.$router)
            }
        },
    }
</script>