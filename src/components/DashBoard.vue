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
    <BImg v-bind="mainProps" rounded="circle" alt="Circle image" @click="toogleUser"/>
    <BCollapse id="user-toogle" v-model="isToogleUser">
      <div class="user-menu-content">
          <p>{{ user }}</p>
          <BButton @click="logout">Cerrar Sesión</BButton>
        </div>
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
      },
      isToogleUser: false
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
    },
    toogleUser(){
      this.isToogleUser = !this.isToogleUser
    },
    logout(){
      localStorage.removeItem('user')
      localStorage.removeItem('data')
      localStorage.removeItem('dataMenu')
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.user-menu-content {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 1050;
}
</style>
