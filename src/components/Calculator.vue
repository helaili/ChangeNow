<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Number 1">
        <el-col :span="4">
          <el-input-number v-model="form.op1" :min="1" :max="10"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="Number 2">
        <el-col :span="4">
          <el-input-number v-model="form.op2" :min="1" :max="10"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="divide">Divide</el-button>
        <el-button @click="reset">Reset</el-button>
      </el-form-item>
    </el-form>
    <h3>Result is : {{ result }}</h3>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Calculator App',
      form: {
        op1: 1,
        op2: 1
      },
      result: 0
    }
  },
  methods: {
    divide () {
      console.log(this.form.op1 / this.form.op2)
      this.$http.post('/myfeature', this.form).then((res) => {
        this.result = res.data.result
      }, (error) => {
        console.log(error)
      })
    },
    reset () {
      this.form.op1 = this.form.op2 = 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
