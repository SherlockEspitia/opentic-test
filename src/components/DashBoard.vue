<template>
  <BNavbar class="navbar navbar-light bg-light d-flex wrap ">
    <BNavbarBrand>{{ user }}</BNavbarBrand>
    <BNavbarNav >
      <BNavItemDropdown v-for="menu in menuOpciones" :key="menu.idModulo" :text="menu.nombre">
        <BDropdownItem v-for="(op,idx) in menu.children" :key="idx"> {{ op.aliasRolOperacion }}</BDropdownItem>
      </BNavItemDropdown>
    </BNavbarNav>
  </BNavbar>
  <BContainer>The Container </BContainer>
</template>

<script>


export default {
  data(){
    return {
      dataMenu: JSON.parse(localStorage.getItem('dataMenu')),
      allDataUser: JSON.parse(localStorage.getItem('data'))
    }
  },
  created(){
    console.log('dataMenu', this.dataMenu)
    console.log('operaciones', this.buscarOperaciones())
  },
  computed:{
    user(){
      if(this.allDataUser){
        return this.allDataUser.nombre
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
  },
  mounted(){
    this.buscarOperaciones()
  },
  methods:{
    buscarOperaciones(){
      let {operaciones} = this.allDataUser
      let menus = this.menuOpciones
      menus.forEach((menu)=>{
        let tmpOp = operaciones.filter((operacion)=>
          operacion.nombreRolOperacion.split('%')[0] == menu.ruta
        )
        menu.children = tmpOp
      })
      console.log(menus[0].children)
      return operaciones
    }
  }
}
</script>

<style>

</style>
