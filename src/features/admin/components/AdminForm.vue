<template>
  <div class="card">
    <h3>Ajoutez un article</h3>
    <form @submit="trySubmit">
      <div class="d_flex flex_column mb_20">
        <label class="mb_5">Titre*</label>
        <input ref="firstInput" type="text" v-model="title.value.value">
        <small class="form_err" v-if="title.errorMessage.value">{{title.errorMessage.value}}</small>
      </div>
      <div class="d_flex flex_column mb_20">
        <label class="mb_5">Image*</label>
        <input type="text" v-model="image.value.value">
        <small class="form_err" v-if="image.errorMessage.value">{{image.errorMessage.value}}</small>
      </div>
      <div class="d_flex flex_column mb_20">
        <label class="mb_5">Prix*</label>
        <input type="number" v-model="price.value.value">
        <small class="form_err" v-if="price.errorMessage.value">{{price.errorMessage.value}}</small>
      </div>
      <div class="d_flex flex_column mb_20">
        <label class="mb_5">description*</label>
        <textarea v-model="(description.value.value as string)"></textarea>
        <small class="form_err" v-if="description.errorMessage.value">{{description.errorMessage.value}}</small>
      </div>
      <div class="d_flex flex_column mb_20">
        <label class="mb_5">Categorie*</label>
        <select v-model="category.value.value">
          <optgroup label="Choisissez une catégorie">
            <option value="gamer">Jeu</option>
            <option value="desktop">Bureautique</option>
            <option value="streaming">stream</option>
          </optgroup>
        </select>
        <small class="form_err" v-if="category.errorMessage.value">{{category.errorMessage.value}}</small>
      </div>
      <button class="btn btn_primary" :disabled="isSubmitting">Sauvegarder</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {useField, useForm} from "vee-validate";
import {z} from "zod";
import {toFormValidator} from "@vee-validate/zod";
import {onMounted, ref} from "vue";

const firstInput = ref<HTMLInputElement | null>(null)

onMounted(()=>{
  firstInput.value?.focus()
})

const required_error = {required_error: 'Veuillez renseigner ce champ'}
const validationSchema = toFormValidator(
    z.object({
      title: z.string(required_error)
          .min(1,{message:"Le titre doit faire au moins 1 caractére"})
          .max(20, {message:"Le titre doit faire moin de 20 caractéres"}),
      image: z.string(required_error),
      price: z.number(required_error)
          .min(0,{message:"Le prix doit être au minimum à 0$"})
          .max(15000, {message:"le prix doit être inférieur à 15000"}),
      description: z.string(required_error)
          .min(10, {message:'la description dois faire au moins 10 caractères'}),
      category: z.string(required_error)
    }))
const { handleSubmit, isSubmitting } = useForm({validationSchema})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const description = useField('description')
const category = useField('category')

const trySubmit = handleSubmit( async(formValues, {resetForm})=> {
  try {
    await fetch('https://restapi.fr/api/projectVue',{
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-type": "application/json"
      }
    })
    resetForm()
    firstInput.value?.focus()
  }catch (e) {
    console.log(e)
  }
})

</script>



<style scoped lang="sass">
.card
  min-width: 600px
</style>