<template>
  <BNavbar class="navbar navbar-light bg-light d-flex wrap ">
    <BNavbarBrand>{{ user }}</BNavbarBrand>
    <BNavbarNav >
      <BNavItemDropdown v-for="menu in menuOpciones" :key="menu.idModulo" :text="menu.nombre">{{ menu.id }}</BNavItemDropdown>
    </BNavbarNav>
  </BNavbar>
  <BContainer>The Container </BContainer>
</template>

<script>

export default {
  data(){
    return {
      dataMenu: JSON.parse(localStorage.getItem('dataMenu')),
    }
  },
  created(){
    console.log('dataMenu', this.dataMenu)
  },
  computed:{
    user(){
      let data = JSON.parse(localStorage.getItem('data'))
      if(data){
        return data.nombre
      }
      return 'user'
    },
    menuOpciones(){
      let {menu} = this.dataMenu
      if(menu){
        console.log('menu', menu)
        return menu

      }
      return []
    }
  }
}
</script>

<style>

</style>
