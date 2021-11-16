<template>
  <div id="app">
    <ejs-grid
      :dataSource="gridData"
      ref="grid"
      :allowPaging="true"
      :editSettings="editSettings"
      :toolbar="toolbar"
      :actionBegin="actionBegin"
    >
      <e-columns>
        <e-column
          field="OrderID"
          headerText="Order ID"
          :isPrimaryKey="true"
          width="100"
        ></e-column>
        <e-column
          field="CustomerID"
          headerText="Customer ID"
          width="120"
        ></e-column>
        <e-column
          field="Freight"
          headerText="Freight"
          width="120"
          :editTemplate="freightTemplate"
        ></e-column>
        <e-column
          field="ShipCountry"
          headerText="Ship Country"
          width="150"
          :editTemplate="editTemplate"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import Vue from "vue";
import { data } from "./datasource.js";
import { GridPlugin, Edit, Page, Toolbar } from "@syncfusion/ej2-vue-grids";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";

Vue.use(GridPlugin);
Vue.use(AutoCompletePlugin);

export default {
  name: "App",
  data() {
    return {
      gridData: data,
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
      },
      toolbar: ["Add", "Edit", "Delete", "Update", "Cancel"],
    };
  },
  methods: {
    editTemplate: function() {
      return {
        template: Vue.component("datePicker", {
          template: `<ejs-autocomplete id='ShipCountry' @change="onChange" v-model='data.ShipCountry' :dataSource='dropData'></ejs-autocomplete>`,
          data() {
            return {
              data: {},
              dropData: [
                "Argentina",
                "Austria",
                "Belgium",
                "Brazil",
                "Canada",
                "Denmark",
                "Finland",
                "France",
                "Germany",
                "Ireland",
                "Italy",
                "Mexico",
                "Norway",
                "Poland",
                "Portugal",
                "Spain",
                "Sweden",
                "Switzerland",
                "UK",
                "USA",
                "Venezuela",
              ],
            };
          },
          methods: {
            onChange(args) {
              if (args.value === "Argentina") {
                var gridInst = this.$root.$children[0].$refs.grid.ej2Instances;
                console.log(gridInst, "gridInst");
                var customerIDEle = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "CustomerID"
                );
                customerIDEle.value = "VICTE";
                var freightIDEle = gridInst.editModule.formObj.element.querySelector(
                  "#" + "Freight"
                );
                freightIDEle.value = 23;
              }
            },
          },
        }),
      };
    },
    freightTemplate: function() {
      return {
        template: Vue.component("frieghtTem", {
          template: `<input type="number" id="Freight" v-model="data.Freight" class="e-field e-input e-control e-numerictextbox e-lib"/> `,
          data() {
            return {
              data: {},
            };
          },
          methods: {
            // onChange(args) {
            //   if (args.value === "Argentina") {
            //     var gridInst = this.$root.$children[0].$refs.grid.ej2Instances;
            //     console.log(gridInst, "gridInst");
            //     var customerIDEle = gridInst.editModule.formObj.element.querySelector(
            //       "#" + gridInst.element.id + "CustomerID"
            //     );
            //     customerIDEle.value = "VICTE";
            //   }
            // },
          },
        }),
      };
    },
    actionBegin(args) {
      console.log(args, "actionBegin", args);
    },
  },
  provide: {
    grid: [Edit, Page, Toolbar],
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
</style>
