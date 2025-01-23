<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-fluid">
    <div class="row d-flex">
      <div class="col-3"></div>
      <div class="col-6">
        <BCard title="Inicio de sesión" class="my-3">
          <BForm @submit.prevent="login">
            <div class="my-3">
              <BInput
                type="text" v-model="username"
                id="username" required placeholder="Usuario" />
            </div>
            <div class="my-3">
              <BInput
                type="password"
                v-model="password"
                id="password"
                required
                placeholder="Contraseña"
              />
            </div>
            <div v-if="errorMessage">{{ errorMessage }}</div>
            <BButton type="submit" variant="success">Login</BButton>
          </BForm>
        </BCard>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      try {
        let data = {
          jsonSend: JSON.stringify({
            username: this.username,
            password: this.password,
            recaptcha: null,
          }),
        }
        const response = await axios.post('http://139.177.195.95/site/login/', qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json, text/plain, */*',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            Priority: 'u=0',
          },
        })
        let resdata = JSON.parse(response.data.encrypted)
        if (response.status === 200) {
          this.errorMessage = resdata.status == 322 ? resdata.data.password[0] : ''
          if (resdata.status === 200){
            localStorage.setItem('user', this.username)
            localStorage.setItem('data', JSON.stringify(resdata.data))
            localStorage.setItem('dataMenu', JSON.stringify(resdata.dataMenu))
            localStorage.setItem('token', JSON.stringify(resdata.data.accessToken))
            this.$router.push('/dashboard')
            //alert('Login exitoso!')
          }

        } else {
          this.errorMessage = response.message
        }
      } catch (error) {
        console.log(error)
        this.errorMessage = 'Error de conexión. Por favor, inténtalo de nuevo.'
      }
    },
  },
}
</script>
