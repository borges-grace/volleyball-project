<template>
  <v-card flat color="transparent">
    <!-- Header -->
    <v-row>
      <v-col cols="auto" class="pr-0">
        <v-card-title class="text-h2 pr-0">{{ header }} </v-card-title>
      </v-col>
      <v-col cols="1" class="pb-0">
        <v-card-subtitle class="text-h5 pb-0 pt-11">
          {{ cRosterSize }}
        </v-card-subtitle>
      </v-col>
    </v-row>
    <v-row>

      <!-- Add athlete card -->
      <v-col cols="5">
        <v-card color="transparent" flat>
          <v-card-title class="text-h4"> Add Athlete </v-card-title>
          <v-card-text>
            <!-- First name -->
            <v-row class="py-0">
              <v-col :cols="cLargeRosterCols" class="py-0">
                <v-text-field
                  outlined
                  filled
                  dense
                  label="First Name"
                  v-model="athlete.FirstName"
                />
              </v-col>
            </v-row>

            <!-- Last name -->
            <v-row class="py-0">
              <v-col :cols="cLargeRosterCols" class="py-0">
                <v-text-field
                  outlined
                  filled
                  dense
                  label="Last Name"
                  v-model="athlete.LastName"
                />
              </v-col>
            </v-row>

            <!-- Jersey number -->
            <v-row class="py-0">
              <v-col class="py-0" cols="4">
                <v-text-field
                  outlined
                  filled
                  dense
                  label="Jersey Number"
                  type="number"
                  v-model="athlete.JerseyNumber"
                />
              </v-col>
            </v-row>

            <!-- Position and rank -->
            <v-row class="py-0">
              <v-col class="py-0" :cols="cLargeRosterCols">
                <v-select
                  outlined
                  filled
                  dense
                  label="Position"
                  v-model="athlete.Position"
                  :items="positions"
                  item-text="position"
                  return-object
                />
              </v-col>
              <v-col class="py-0" cols="4">
                <v-text-field
                  outlined
                  filled
                  dense
                  label="Rank"
                  v-model="athlete.Rank"
                  type="number"
                />
              </v-col>
            </v-row>

            <!-- Height -->
            <v-row class="py-0">
              <v-col class="py-0" :cols="cLargeRosterCols">
                <v-select outlined filled dense label="Height"> </v-select>
              </v-col>
            </v-row>

            <!-- Class -->
            <v-row class="py-0">
              <v-col class="py-0" :cols="cLargeRosterCols">
                <v-select
                  outlined
                  filled
                  dense
                  label="Class"
                  v-model="athlete.Class"
                  :items="classes"
                  item-text="class"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-end pr-5">
            <v-btn @click="addAthlete" :disabled="cAddDisabled">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-divider vertical />

      <!-- Roster card -->
      <v-col>
        <v-card color="transparent" flat>
          <v-card-text>
            <v-data-table
              :headers="rosterTableHeaders"
              :items="roster"
              dense
              sort-by="LastName"
              hide-default-footer
            >
              <template #[`item.FullName`]="{ item }">
                {{ item.LastName }}, {{ item.FirstName }}
              </template>
              <template #[`item.Position`]="{ item }">
                {{ item.Position.acronym }}{{ item.Rank }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card-actions class="d-flex justify-end">
      <v-btn :disabled="cContinueDisabled">
        Continue
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TeamView",

  data() {
    return {
      header: "",
      athlete: {
        FirstName: "",
        LastName: "",
        JerseyNumber: 0,
        Position: null,
        Rank: 0,
        Height: null,
        Class: null,
      },
      roster: [],
      positions: [
        { ID: 1, position: "Setter", acronym: "S" },
        { ID: 2, position: "Outside", acronym: "OH" },
        { ID: 3, position: "Middle Blocker", acronym: "MB" },
        { ID: 4, position: "Right Side", acronym: "RS" },
        { ID: 5, position: "Libero", acronym: "L" },
        { ID: 6, position: "Defensive Specialist", acronym: "DS" },
        { ID: 7, position: "Serving Specialist", acronym: "SS" },
      ],
      classes: [
        { ID: 1, class: "Freshman" },
        { ID: 2, class: "Sophomore" },
        { ID: 3, class: "Junior" },
        { ID: 4, class: "Senior" },
      ],
      rosterTableHeaders: [
        { text: "Name", value: "FullName" },
        { text: "Number", value: "JerseyNumber" },
        { text: "Position", value: "Position" },
        { text: "Height", value: "Height" },
        { text: "Class", value: "Class" },
      ],
    };
  },

  computed: {
    ...mapGetters("school", ["getSchool"]),

    cRosterSize() {
      return this.roster.length;
    },

    cLargeRosterCols() {
      return this.$vuetify.breakpoint.mdAndUp ? 8 : 12
    },

    cAddDisabled() {
      return this.athlete.FirstName.length == 0 || this.athlete.LastName.length == 0;
    },

    cContinueDisabled() {
      return this.cRosterSize == 0;
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      if (!this.getSchool) {
        this.$router.push("/");
      }
      this.header = this.getSchool?.MascotSingular + "'s Roster";
    },

    addAthlete() {
      console.log("athlete", this.athlete);
      this.roster.push(this.athlete);
      this.athlete = {
        FirstName: "",
        LastName: "",
        JerseyNumber: 0,
        Position: null,
        Rank: 0,
        Height: null,
        Class: null,
      };
    },
  },
};
</script>
