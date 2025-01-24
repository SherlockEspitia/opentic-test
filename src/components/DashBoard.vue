<template>
  <BNavbar fluid="sm" variant="light" toggleable="sm" class="navbar-nav-scroll">
    <BNavbarBrand>{{ user }}</BNavbarBrand>
    <BNavbarToggle target="navcollapse" />
    <BCollapse id="navcollapse" is-nav>
      <BNavbarNav class="flex-wrap">
        <BNavItemDropdown v-for="menu in menuOpciones" :key="menu.idModulo" :text="menu.nombre" placement="right-end">
          <BDropdownItem v-for="(op,idx) in menu.children" :key="idx">
            {{ op.aliasRolOperacion }}
          </BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
    <BImg v-bind="mainProps" rounded="circle" alt="Circle image" />
    <BCollapse>
      hello
    </BCollapse>
  </BNavbar>
  <BContainer></BContainer>
</template>

<script>


export default {
  data(){
    return {
      dataMenu: JSON.parse(localStorage.getItem('dataMenu')),
      allDataUser: JSON.parse(localStorage.getItem('data')),
      mainProps : {
        blank: true,
        blankColor: '#777',
        width: 75,
        height: 75,
        class: 'm1',
      }
    }
  },
  created(){
    //console.log('operaciones', this.buscarOperaciones())
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
        if(tmpOp.length==0){
          menu.children = ['No hay operaciones']
        }else{
          menu.children = tmpOp
        }
      })
      return operaciones
    }
  }
}
</script>

<style>

</style>
