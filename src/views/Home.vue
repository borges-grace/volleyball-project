<template>
  <div>
    <v-card>
      <v-card-title> <v-row class="text-center">Welcome! </v-row></v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="auto">
            <v-text-field label="Enter your team name" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
