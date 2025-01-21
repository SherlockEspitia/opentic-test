<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-fluid">
    <div class="row d-flex">
      <div class="col-3"></div>
      <div class="col-6">
        <BCard title="Inicio de sesión" class="my-3">
          <BForm @submit.prevent="login">
            <div class="my-3">
              <BInput type="text" v-model="username" id="username" required placeholder="Usuario" />
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
        console.log(data)
        const response = await axios.post('http://139.177.195.95/site/login/', qs.stringify(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:134.0) Gecko/20100101 Firefox/134.0',
            Accept: 'application/json, text/plain, */*',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            Origin: 'http://139.177.195.95',
            Connection: 'keep-alive',
            Referer: 'http://139.177.195.95/index.html',
            Cookie:
              'JSESSIONID.340536d2=node01jczydiety7wo12x3vxyraxoet17453.node0; jenkins-timestamper-offset=18000000',
            Priority: 'u=0',
          },
        })
        if (response.data.success) {
          alert('Login exitoso!')
        } else {
          this.errorMessage = response.data.message
        }
        console.log(response)
      } catch (error) {
        console.log(error)
        this.errorMessage = 'Error de conexión. Por favor, inténtalo de nuevo.' + error
      }
    },
  },
}
</script>
