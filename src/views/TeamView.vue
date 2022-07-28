<template>
  <v-card flat color="transparent">
    <!-- Header -->
    <v-row>
      <v-col cols="auto" class="pr-0">
        <v-card-title class="text-h2 pr-0">{{ header }} </v-card-title>
      </v-col>
      <v-col cols="1" class="pb-0">
        <v-card-subtitle class="text-h5 pb-0 pt-11">
          {{ rosterSize }}
        </v-card-subtitle>
      </v-col>
    </v-row>

    <!-- Body -->
    <v-row>
      <!-- Enter player info -->
      <v-col cols="5" class="ml-2">
        <v-card color="transparent" flat>
          <v-card-title class="text-h5"> Add player </v-card-title>
          <v-card-text>
            <!-- First name -->
            <v-row class="py-0">
              <v-col cols="8" class="py-0 mr-0">
                <v-text-field
                  v-model="athlete.FirstName"
                  dense
                  filled
                  outlined
                  label="First Name"
                />
              </v-col>
            </v-row>

            <!-- Last name -->
            <v-row class="py-0">
              <v-col cols="8" class="py-0 mr-0">
                <v-text-field
                  v-model="athlete.LastName"
                  dense
                  filled
                  outlined
                  label="Last Name"
                />
              </v-col>
              <span class="red--text pl-0">*</span>
            </v-row>

            <!-- Jersey number -->
            <v-row class="py-0">
              <v-col class="py-0" cols="4">
                <v-text-field
                  v-model="athlete.JerseyNumber"
                  dense
                  filled
                  outlined
                  type="number"
                  label="Jersey Number"
                />
              </v-col>
              <span class="red--text pl-0">*</span>
            </v-row>

            <!-- Position and rank -->
            <v-row class="py-0">
              <v-col class="py-0" cols="8">
                <v-select
                  v-model="athlete.Position"
                  dense
                  filled
                  outlined
                  return-object
                  label="Position"
                  item-text="position"
                  :items="positions"
                />
              </v-col>
              <v-col class="py-0" cols="4">
                <v-text-field
                  v-model="athlete.Rank"
                  dense
                  filled
                  outlined
                  label="Rank"
                  type="number"
                />
              </v-col>
            </v-row>

            <!-- Class -->
            <v-row class="py-0">
              <v-col class="py-0" cols="8">
                <v-select
                  v-model="athlete.Class"
                  dense
                  filled
                  outlined
                  label="Class"
                  item-text="class"
                  :items="classes"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-end pr-5">
            <v-btn :disabled="disableAddButton" @click="addAthlete">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-divider vertical />

      <!-- Table of athletes -->
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
                {{ item.Position ? item.Position.Acronym : ""
                }}{{ item.Position ? item.Rank : "" }}
              </template>
              <template #[`item.Modify`]="{ item }">
                <v-icon @click="modifyPlayer(item)">mdi-pencil-outline</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card-actions v-if="rosterSize > 0" class="d-flex justify-end py-0">
      <v-btn @click="submitRoster()">Submit Roster</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
        { text: "Class", value: "Class" },
        { text: "", value: "Modify" },
      ],
    };
  },

  computed: {
    ...mapGetters("school", ["getSchool"]),
    ...mapGetters("team", ["getTeam"]),

    // returns how many people have been put into the team roster so far
    rosterSize() {
      return this.roster.length;
    },

    // disables the add button if we don't have the bare minumum
    disableAddButton() {
      return !this.athlete.LastName || !this.athlete.JerseyNumber;
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions("team", ["postTeam"]),

    initialize() {
      if (!this.getSchool) {
        this.$router.push("/");
      }
      this.header = this.getSchool?.MascotSingular + "'s Roster";
    },

    /**
     * adds an athlete to the roster table and
     * resets the values in the add athlete section
     */
    addAthlete() {
      this.roster.push(this.athlete);
      this.athlete = {
        FirstName: "",
        LastName: "",
        JerseyNumber: 0,
        Position: null,
        Rank: 0,
        Class: null,
      };
    },

    /**
     * removes the user from the roster and puts all of
     * their values in the add athlete section so it can
     * be modified
     */
    modifyPlayer(player) {
      let removePlayer = this.roster.findIndex(
        (athlete) =>
          athlete.JerseyNumber == player.JerseyNumber &&
          athlete.FirstName == player.FirstName
      );
      this.roster.splice(removePlayer, 1);
      this.athlete = {
        FirstName: player.FirstName,
        LastName: player.LastName,
        JerseyNumber: player.JerseyNumber,
        Position: player.Position,
        Rank: player.Rank,
        Class: player.Class,
      };
    },

    /**
     * creates the team record in the mapState
     */
    submitRoster() {
      this.postTeam(this.roster);
    },
  },
};
</script>
