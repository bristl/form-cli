<template lang='pug'>
.wrapper
  h1 Home.vue
  form.form(action='javascript: void(0)')
    #vueContainer__form-input.container__form-input
      div Участники договора
      button#vueAddNewInput.button.button__plus(type='submit', @click='pushInput') +
      .container__input(v-for='input in inputs')
        input.nameField(type='text', placeholder='', name='name', v-bind:value='input.name')
        input.phoneField(type='tel', placeholder='+7 000 000 000', name='phone', v-bind:value='input.phone')

    .container__form-input
      div Вид собственности
      label(for='typeField')
      select#typeField.typeField(v-on:change='changeSelect')
        option(value='1') Общая собственность
        option(value='2') Частная собственность
        option(value='3') Государственная собственность

    .container__form-input
      ul#type-container.type-container
        li.vid__item(v-for='item in json.main')
          | {{item.title}}
          span.vid__item-date {{item.value}}
      #totalArea
        .vid__item
          | Площадь.......
          span#totalArea.vid__item-date {{ json.totalArea }}
      #tabel.tabel
        .container-tabel(v-for='item in json.area')
          div {{item.title}}
          ul
            li.tabel__item(v-for='itemArea in item.detail')
              | {{itemArea.title}}
              span.tabel__date {{itemArea.value}}
    .send-button-container
      .send-button
        button#send.button(type='submit', @click='sendButton') Send
      div
        button#load.button(type='button', @click='load') Load
</template>

<script>
import vueDataJson from '../../data.json'

const names = ['Иванов', 'Смирнов Владимир', 'Кузнецов Алексей', 'Попов Игорь', 'Петров Петр', 'Новикова Алена', 'Волков Сергей', 'Егоров Егор', 'Федор Бондарчук', 'А я Никита']
const inputs = [
  {
    name: '',
    phone: ''
  }
]

export default {
  data () {
    return {
      inputs: inputs,
      names: names,
      data: vueDataJson,
      json: vueDataJson[1],
      newData: this.$store.getters.getData
    }
  },
  computed: {
    getData () {
      return this.$store.getters.getData
    }
  },
  async mounted () {
    this.$store.dispatch('fetchJson')
  },
  /* eslint-disable */
  methods: {
    pushInput() {
      this.inputs.push({name:'', phone:''})
    },
    load() {
      console.log(this.newData)
      const nameFields = document.querySelectorAll('.nameField')
      const phoneFields = document.querySelectorAll('.phoneField')

      this.inputs

      nameFields.forEach((item, i) => {
      if (item.value) return
      
      //генерируем Имя и Фамилию из массива
      this.inputs[i].name = this.names[Math.floor(Math.random() * (10))]
      //item.value = this.names[Math.floor(Math.random() * (10))]
     })

      phoneFields.forEach((item, i) => {
      if (item.value) return
      //генерируем номер телефона в формате +7 (9хх) хххххх
      this.inputs[i].phone = `+7 (9${Math.floor(Math.random()* 100)}) ${Math.floor(Math.random()* 1000000)}`
      //item.value = `+7 (9${Math.floor(Math.random()* 100)}) ${Math.floor(Math.random()* 1000000)}`
      })
    },
    sendButton() {
      const dataForSend = this.json
      const inputsContainer =  document.querySelectorAll(".container__input")
      for (let i = 0; i < inputsContainer.length; i+= 1) {
        let inputs = inputsContainer[i].children
        let personNumber = `person${i + 1}`
        dataForSend[personNumber] = {}
        for (let i = 0; i < inputs.length; i+= 1) {
          let name = inputs[i].name
          dataForSend[personNumber][name] = inputs[i].value
        }
      }

      fetch('127.0.0.1', {method: 'POST', body:JSON.stringify(dataForSend)})
      .then(() => alert(dataForSend))
      .catch(error => alert(error))
    },
    changeSelect(e) {
      console.log(e.target.value)
      this.json = this.data[e.target.value]
    }
  }
}
</script>

<style lang='stylus'>
.wrapper
  display flex
  flex-direction column
  align-items center
  margin 0 auto
.form
  width 800px
  margin-top 100px
  margin-bottom 300px
  font-size 28px

.container__form-input
  margin-top 30px
  margin-bottom 30px

.nameField, .phoneField, .typeField,
.button
  padding 10px 20px
  border 2px solid black
  border-radius 5px
  cursor pointer
  font-size 18px

.button__plus
  float right

.container__input_button
  display flex
  align-items flex-start

.container__input
  margin-bottom 20px

.type-container
  display flex

.vid__item
  margin-right 30px
  &:last-child
    margin-right 0
  color #808080
  font-size 20px

.vid__item-date
  color black
  font-size 22px

.tabel
  display flex
  justify-content space-between

.send-button-container
  display flex
  flex-direction column
  align-items flex-end

.send-button
  margin-bottom 20px
</style>
