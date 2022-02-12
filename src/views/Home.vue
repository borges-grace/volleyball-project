<template>
  <!-- <v-container class="fill-height"> -->
  <v-card flat tile>
    <!-- Welcome -->
    <v-row align="center" align-content="center" justify="center">
      <v-card-title class="text-h1"> Welcome! </v-card-title>
    </v-row>

    <!-- Subtitle -->
    <v-row align="center" align-content="center" justify="center">
      <v-card-subtitle class="text-h4">
        To start, give us some information about your school
      </v-card-subtitle>
    </v-row>
    <v-card-text>
      <!-- School name -->
      <v-row align="center" justify="center">
        <v-col cols="3" class="text-right text-h5">
          <span>School name</span>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="schoolName" />
        </v-col>
      </v-row>

      <!-- Mascot -->
      <v-row align="center" justify="center">
        <v-col cols="3" class="text-right text-h5">
          <span>Mascot</span>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="schoolMascot" />
        </v-col>
      </v-row>

      <!-- Primary color -->
      <v-row align="center" justify="center">
        <v-col cols="3" class="text-right text-h5">
          <span>Primary color</span>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="primaryColor" />
        </v-col>
        <v-col cols="1">
          <v-btn
            :color="primaryColor"
            @click="pickerVisible = !pickerVisible"
          />
        </v-col>
      </v-row>
      <v-row class="pt-4">
        <v-col>
          <v-row>
            <v-col cols="12" class="d-flex justify-space-around">
              <v-color-picker
                v-if="pickerVisible"
                v-model="primaryColor"
                :value="primaryColor"
                flat
                mode="hexa"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn text outlined> Continue </v-btn>
    </v-card-actions>
  </v-card>
  <!-- </v-container> -->
</template>

<script>
export default {
  name: "Home",

  components: {},

  data() {
    return {
      schoolName: "",
      schoolMascot: "",
      primaryColor: "#FF0000",
      pickerVisible: false,
    };
  },

  computed: {
    disableSave() {
      return (
        !this.schoolName.length &&
        !this.schoolMascot.length &&
        !this.primaryColor.length
      );
    },
  },
};
</script>
