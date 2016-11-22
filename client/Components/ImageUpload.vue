<template lang="html">
  <div class="row">
    <div class="col s4 m2">
      <img v-if="imageSource" v-bind:src="imageSource" class="materialboxed z-depth-1 image"/>
    </div>
    <div class="col s8 m10 file-field input-field">


         <div class="file-path-wrapper">
           <i class="material-icons prefix">add_a_photo</i>
           <input id="icon_telephone" type="file" v-on:change="upload" />

        <input  class="file-path validate" v-bind:placeholder="placeholder" type="text">
      </div>
    </div>
  </div>
</template>

<script>
import {upload} from "../ApiClient"

export default {
  data() {
    return {
      file: null,
      imageSource: null
    }
  },
  props: ["placeholder"],
  methods: {
    upload(e) {
      upload(e.currentTarget.files[0])
      .then((data) => {
        console.log(data);
        this.imageSource = data.url
        this.$emit("fileUploaded", data)
      })
      .catch(e => console.error(e))
      // reader.onload = (e) => {
      //   //post media
      //   console.log(e);
      // }
      //
      // reader.readAsText()
      // e.preventDefault()
      // console.log(e.currentTarget.result);
      // console.log(e);
    }
  }
}
</script>

<style lang="css">

.image {
  width: 60px;
  height: 60px;
}
</style>
