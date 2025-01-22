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
            <BButton type="submit" variant="success">Login</BButton>
          </BForm>
        </BCard>
        <div v-if="errorMessage">{{ errorMessage }}</div>
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
            Origin: 'http://139.177.195.95',
            Cookie:
              'JSESSIONID.340536d2=node01jczydiety7wo12x3vxyraxoet17453.node0; jenkins-timestamper-offset=18000000',
            Priority: 'u=0',
          },
        })
        console.log(response)
        if (response.status === 200) {
          console.log(JSON.parse(response.data.encrypted))
          localStorage.setItem('user', this.username)
          //router.push('/dashboard')
          this.$router.push('/dashboard')
          //alert('Login exitoso!')
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
