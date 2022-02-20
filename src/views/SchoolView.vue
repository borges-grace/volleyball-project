<template>
  <v-card flat tile color="transparent">
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
          School name <span class="red--text">*</span>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="schoolName" />
        </v-col>
      </v-row>

      <!-- Mascot -->
      <v-row align="center" justify="center">
        <v-col cols="3" class="text-right text-h5">
          Mascot <span class="red--text">*</span>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="schoolMascot" />
        </v-col>
      </v-row>

      <!-- Primary color -->
      <v-row align="center" justify="center">
        <v-col cols="3" class="text-right text-h5">
          Primary color <span class="red--text">*</span>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="primaryColor"
            @click="pickerVisible = !pickerVisible"
          />
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
    <v-row>
      <v-col cols="10">
        <v-card-actions class="d-flex justify-end">
          <v-btn
            text
            outlined
            :disabled="cDisableContinue"
            @click="setValues"
            to="/Team"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SchoolView",

  components: {},

  data() {
    return {
      schoolName: "",
      schoolMascot: "",
      primaryColor: "#4B2682",
      pickerVisible: false,
    };
  },

  computed: {
    cDisableContinue() {
      return (
        !this.schoolName.length ||
        !this.schoolMascot.length ||
        !this.primaryColor.length
      );
    },
  },

  methods: {
    ...mapActions("school", ["putSchool"]),

    async setValues() {
      let school = {
        Name: this.schoolName,
        Mascot: this.schoolMascot,
        Color: this.primaryColor,
      };
      await this.putSchool(school);
    },
  },
};
</script>
