<template>
  <div id="app">
    <ejs-grid
      ref="SO_lineItem_Grid"
      :allowResizing="true"
      :showColumnChooser="true"
      rowHeight="40"
      :dataSource="dataGrid"
      :editSettings="editSettings"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :load="loadSoGrid"
      :dataBound="dataBound"
      :actionComplete="actionComplete"
      :actionBegin="actionBegin"
      :selectionSettings="selectionOptions"
      :rowSelected="rowSelected"
    >
      <!-- :toolbar="toolbar" -->
      <e-columns>
        <e-column
          field="ItemCode"
          headerText="Item Code"
          :editTemplate="itemCodeTemplate"
          minWidth="150"
          width="200"
          maxWidth="300"
          textAlign="center"
        ></e-column>
        <e-column
          field="ItemDescription"
          headerText="Description"
          minWidth="150"
          width="200"
          maxWidth="250"
          textAlign="center"
          :editTemplate="descriptionEditTemplate"
          :template="descriptionViewTemplate"
        ></e-column>
        <e-column
          field="SubHierarchyCode"
          headerText="Subcode"
          allowEditing="false"
          minWidth="100"
          width="100"
          maxWidth="150"
          textAlign="center"
        ></e-column>
        <e-column
          field="ItemQuantity1"
          headerText="UOM0"
          minWidth="55"
          width="55"
          maxWidth="80"
          textAlign="center"
          :template="UOM0ViewTemplate"
          :editTemplate="UOM0EditTemplate"
        ></e-column>
        <e-column
          field="ItemQuantity2"
          headerText="UOM1"
          minWidth="55"
          width="55"
          maxWidth="80"
          textAlign="center"
          :template="UOM1ViewTemplate"
          :editTemplate="UOM1EditTemplate"
        ></e-column>
        <e-column
          field="ItemQuantity3"
          headerText="UOM2"
          minWidth="55"
          width="55"
          maxWidth="80"
          textAlign="center"
          :allowEditing="false"
          :visible="false"
        ></e-column>
        <e-column
          field="ItemQuantity4"
          headerText="UOM3"
          minWidth="55"
          width="55"
          maxWidth="80"
          textAlign="center"
          :visible="false"
        ></e-column>
        <e-column
          field="ItemQuantity5"
          headerText="UOM4"
          minWidth="55"
          width="55"
          maxWidth="80"
          textAlign="center"
          :visible="false"
        ></e-column>
        <e-column
          field="BaseItemQuantity"
          headerText="Qty"
          minWidth="75"
          width="75"
          maxWidth="90"
          textAlign="center"
          :allowEditing="false"
        ></e-column>
        <e-column
          field="MRP"
          headerText="MRP"
          minWidth="100"
          width="100"
          maxWidth="150"
          textAlign="center"
          :allowEditing="false"
          :template="MrpViewTemplate"
        ></e-column>
        <e-column
          minWidth="105"
          width="105"
          maxWidth="150"
          field="SalesPrice"
          headerText="Item Price"
          textAlign="center"
          :template="ItemPriceViewTemplate"
          :editTemplate="ItemPriceEditTemplate"
        ></e-column>
        <e-column
          field="Discount"
          headerText="Discount"
          minWidth="100"
          width="100"
          maxWidth="150"
          textAlign="center"
          :allowEditing="false"
        ></e-column>
        <e-column
          field="ItemExciseTax"
          headerText="Tax"
          minWidth="100"
          width="100"
          maxWidth="150"
          textAlign="center"
          :allowEditing="false"
          :template="taxViewTemplate"
        ></e-column>
        <e-column
          field="IsFreeGood"
          headerText="Free"
          minWidth="50"
          width="50"
          maxWidth="80"
          textAlign="center"
          :editTemplate="freeEditTemplate"
          :template="freeViewTemplate"
        ></e-column>
        <e-column
          field="LineNetAmount"
          headerText="Amount"
          minWidth="100"
          width="100"
          maxWidth="150"
          textAlign="center"
          :allowEditing="false"
          :template="lineNetAmountViewTemplate"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import Vue from "vue";
import {
  GridPlugin,
  Edit,
  Toolbar,
  ColumnChooser,
  Resize,
  CommandColumn,
  Page,
} from "@syncfusion/ej2-vue-grids";
import { AutoCompletePlugin } from "@syncfusion/ej2-vue-dropdowns";

Vue.use(GridPlugin);
Vue.use(AutoCompletePlugin);

export default {
  name: "App",
  data() {
    return {
      dataGrid: [],
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        newRowPosition: "Bottom",
      },
      selectionOptions: { type: "Single", mode: "Row" },
      SO_lineItem_Grid_Loaded: false,
      pageSettings: { pageSize: 10 },
      selectedColumns: [],
      columnsList: [],
    };
  },
  methods: {
    dataBound() {
      if (this.SO_lineItem_Grid_Loaded) {
        this.SO_lineItem_Grid_Loaded = false;
        var grid = this.$refs.SO_lineItem_Grid.$el.ej2_instances[0];
        grid.addRecord();
      }
      // To get grid columns
      let headerColumn = this.$refs.SO_lineItem_Grid.getColumns();
      let columnArray = [];
      for (let h = 0; h < headerColumn.length; h++) {
        if (
          headerColumn[h].field != undefined &&
          headerColumn[h].field &&
          headerColumn[h].visible
        ) {
          columnArray.push(headerColumn[h].field);
        }
      }
      this.columnsList = columnArray;
      this.selectedColumns = JSON.parse(JSON.stringify(columnArray));
    },
    loadSoGrid() {
      this.SO_lineItem_Grid_Loaded = true;
    },
    actionBegin(args) {
      console.log(args, "actionBegin");
      var grid = this.$refs.SO_lineItem_Grid.$el.ej2_instances[0];
      if (args.action === "add") {
        args.index = grid.currentViewData.length;
      }
      if (args.requestType === "save") {
        var newData = this.rowUpdatedData;
        console.log(
          newData,
          "The hidden column fields can now be updated with this data"
        );
        // The hidden column fields can now be updated with this data
        args.data["BUOMConversion"] = newData["BUOMConversion"];
        args.data["BaseUOM"] = newData["BaseUOM"];
        args.data["ItemNumber"] = newData["ItemNumber"];
        args.data["UnitsOfMeasure"] = newData["UnitsOfMeasure"];
        args.data["ItemQuantity"] = newData["ItemQuantity"];
        args.data["TaxPercentage"] = newData["TaxPercentage"];
        args.data["Conversion1"] = newData["Conversion1"];
        args.data["Conversion2"] = newData["Conversion2"];
        args.data["Conversion3"] = newData["Conversion3"];
        args.data["Conversion4"] = newData["Conversion4"];
        args.index = grid.currentViewData.length;
        setTimeout(() => {
          grid.addRecord();
        }, 200);
      }
      if (args.requestType === "beginEdit") {
        this.rowUpdatedData = args.rowData;
      }
      console.log(this.rowUpdatedData, "this.rowUpdatedData");
    },
    actionComplete(args) {
      if (args.requestType === "save" && args.action === "add") {
        var grid = this.$refs.SO_lineItem_Grid.$el.ej2_instances[0];
        this.dataGrid = this.$refs.SO_lineItem_Grid.ej2Instances.dataSource;
        setTimeout(() => {
          grid.addRecord();
        }, 200);
      }
    },
    rowSelected: function(args) {
      console.log("rowSelected => ", args);
      let selectedrowindex = this.$refs.SO_lineItem_Grid.ej2Instances.getRowInfo(
        args.target
      );
      this.showItemSidebar(selectedrowindex.rowIndex);
    },
    showItemSidebar(selectedRow) {
      console.log(selectedRow, "showItemSidebar");
    },
    /**
     * currentLineItem - contains itemAddObj
     * type - BaseItemQuantity, ItemQuantity, ItemExciseTax, LineNetAmount
     */
    returnUpdatedValue(currentLineItem, type) {
      let requiredValue = 0;
      if (type === "BaseItemQuantity") {
        for (let conversionIndex = 0; conversionIndex < 5; conversionIndex++) {
          if (currentLineItem["Conversion" + conversionIndex] > -1) {
            //   conversion1 to be calculated to itemquantity2
            requiredValue += +currentLineItem[
              "ItemQuantity" + (conversionIndex + 1)
            ]
              ? +currentLineItem["ItemQuantity" + (conversionIndex + 1)]
              : 0;
          }
        }
        let itemQuantity = +currentLineItem.ItemQuantity1 / 100;
        requiredValue += itemQuantity;
      }
      if (type === "ItemQuantity") {
        for (let newIndex = 0; newIndex < 5; newIndex++) {
          if (newIndex === 0) {
            requiredValue = +currentLineItem["ItemQuantity1"];
          }
          if (currentLineItem["Conversion" + newIndex] > -1) {
            requiredValue +=
              (+currentLineItem["ItemQuantity" + (newIndex + 1)]
                ? +currentLineItem["ItemQuantity" + (newIndex + 1)]
                : 0) *
              (+currentLineItem["Conversion" + newIndex]
                ? +currentLineItem["Conversion" + newIndex]
                : 0);
          }
        }
        console.log(requiredValue, "ItemQuantity");
      }
      if (type === "ItemExciseTax") {
        requiredValue =
          ((!currentLineItem.SalesLineID
            ? currentLineItem.TaxPercentage
            : currentLineItem.SalesTax
            ? currentLineItem.SalesTax
            : 0) /
            100) *
          currentLineItem.ItemQuantity *
          currentLineItem.SalesPrice;
      }
      if (type === "LineNetAmount") {
        requiredValue =
          +currentLineItem.ItemExciseTax +
          +currentLineItem.ItemQuantity * +currentLineItem.SalesPrice;
        console.log(requiredValue, "LineNetAmount");
      }
      if (type === "TaxPercentage") {
        requiredValue =
          +currentLineItem.TaxPercentage !== null
            ? +currentLineItem.TaxPercentage
            : +currentLineItem.SalesTax;
        console.log(requiredValue, "TaxPercentage");
      }
      console.log(
        "returnUpdatedValue",
        "currentLineItem =>",
        currentLineItem,
        "type => ",
        type,
        "requiredValue ==>",
        requiredValue
      );
      return requiredValue;
    },
    /**
     * INLINE TEMPLATES STARTS HERE
     */
    itemCodeTemplate() {
      let _this = this;
      return {
        template: Vue.component("itemcodeTemplate", {
          template: `<ejs-autocomplete
                ref="sideBarSearchInline"
                v-model="data.ItemCode"
                id="ItemCode"
                name="ItemCode"
                :dataSource="productMaster"
                :fields="productSearchFields"
                :filtering="getProducts"
                :focus="getProducts"
                @change="changeSelectedProduct"
              ></ejs-autocomplete>`,
          data() {
            return {
              data: {},
              productMaster: [
                {
                  ItemNumber: 25130,
                  ItemCode: "000000000000100053",
                  ItemDescription: "750MLPLBTN1X24 NORM 33.00",
                  Discount: 0,
                  DivisionID: 9,
                  SequenceNumber: 0,
                  ItemTotalPromotion: 0,
                  ItemExciseTax: 0,
                  HierarchyCode: "AQRS250",
                  Numerator: 1,
                  Denominator: 1,
                  UnitsOfMeasure: "EA",
                  UOM1: "CS",
                  BaseUOM: "CS",
                  Conversion1: 24.0,
                  Conversion2: 0.0,
                  Conversion3: 0.0,
                  Conversion4: 0.0,
                  BUOMConversion: 24.0,
                  SubHierarchyCode: "",
                  MRP: 0,
                  SalesPrice: 0,
                  PrincipalPrice: 0,
                  SubDTMargin: 0,
                  TaxPercentage: 40,
                },
                {
                  ItemNumber: 25131,
                  ItemCode: "000000000000100054",
                  ItemDescription: "250MLPLBTN1X40Mang (NC) NORM 18.0",
                  Discount: 0,
                  DivisionID: 9,
                  SequenceNumber: 0,
                  ItemTotalPromotion: 0,
                  ItemExciseTax: 0,
                  HierarchyCode: "AQRS250",
                  Numerator: 1,
                  Denominator: 1,
                  UnitsOfMeasure: "EA",
                  UOM1: "CS",
                  BaseUOM: "CS",
                  Conversion1: 40.0,
                  BUOMConversion: 40.0,
                  SubHierarchyCode: "",
                  MRP: 0,
                  SalesPrice: 0,
                  PrincipalPrice: 0,
                  SubDTMargin: 0,
                  TaxPercentage: 0,
                },
                {
                  ItemNumber: 25132,
                  ItemCode: "000000000000100055",
                  ItemDescription: "250MLPLBTN1X40Mang (NC) NORM 20.0",
                  Discount: 0,
                  DivisionID: 9,
                  SequenceNumber: 0,
                  ItemTotalPromotion: 0,
                  ItemExciseTax: 0,
                  HierarchyCode: "AQRS250",
                  Numerator: 1,
                  Denominator: 1,
                  UnitsOfMeasure: "EA",
                  UOM1: "CS",
                  BaseUOM: "CS",
                  Conversion1: 40.0,
                  BUOMConversion: 40.0,
                  SubHierarchyCode: "",
                  MRP: 0,
                  SalesPrice: 0,
                  PrincipalPrice: 0,
                  SubDTMargin: 0,
                  TaxPercentage: 0,
                },
                {
                  ItemNumber: 25133,
                  ItemCode: "000000000000100056",
                  ItemDescription: "750MLPLBTN1X24",
                  Discount: 0,
                  DivisionID: 9,
                  SequenceNumber: 0,
                  ItemTotalPromotion: 0,
                  ItemExciseTax: 0,
                  HierarchyCode: "AQRS250",
                  Numerator: 1,
                  Denominator: 1,
                  UnitsOfMeasure: "EA",
                  UOM1: "CS",
                  BaseUOM: "CS",
                  Conversion1: 24.0,
                  Conversion2: 0.0,
                  Conversion3: 0.0,
                  Conversion4: 0.0,
                  BUOMConversion: 24.0,
                  SubHierarchyCode: "",
                  MRP: 0,
                  SalesPrice: 0,
                  PrincipalPrice: 0,
                  SubDTMargin: 0,
                  TaxPercentage: 0,
                },
                {
                  ItemNumber: 25134,
                  ItemCode: "100057",
                  ItemDescription: "2LPLBTN1X9 EIRNEWPRODJS",
                  Discount: 0,
                  DivisionID: 9,
                  SequenceNumber: 0,
                  ItemTotalPromotion: 0,
                  ItemExciseTax: 0,
                  HierarchyCode: "AQRS250",
                  Numerator: 1,
                  Denominator: 1,
                  UnitsOfMeasure: "EA",
                  UOM1: "CS",
                  BaseUOM: "CS",
                  Conversion1: 9.0,
                  Conversion2: 0.0,
                  Conversion3: 0.0,
                  Conversion4: 0.0,
                  BUOMConversion: 9.0,
                  SubHierarchyCode: "",
                  MRP: 0,
                  SalesPrice: 0,
                  PrincipalPrice: 0,
                  SubDTMargin: 0,
                  TaxPercentage: 0,
                },
              ],
              productSearchFields: { text: "ItemCode", value: "ItemCode" },
            };
          },
          methods: {
            getProducts(searchText) {
              console.log("getProducts ==>", searchText);
            },
            changeSelectedProduct(event) {
              console.log("this.changeSelectedProduct", event);
              if (!event.isInteracted) {
                return;
              }
              let gridInst;
              gridInst = this.$root.$children[0].$refs.SO_lineItem_Grid
                .ej2Instances;
              console.log(gridInst, "Current grid instance");
              if (
                event.value !== "" &&
                event.itemData &&
                event.itemData.ItemNumber
              ) {
                let ItemDescription = gridInst.editModule.formObj.element.querySelector(
                  "#" + "ItemDescription"
                );
                ItemDescription.value =
                  event && event.itemData ? event.itemData.ItemDescription : "";

                let SubHierarchyCode = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "SubHierarchyCode"
                );
                SubHierarchyCode.value =
                  event && event.itemData && event.itemData.SubHierarchyCode
                    ? event.itemData.SubHierarchyCode
                    : "";

                let ItemQuantity1 = gridInst.editModule.formObj.element.querySelector(
                  "#ItemQuantity1"
                );
                ItemQuantity1.value = "1";
                event.itemData.ItemQuantity1 = "1";

                let ItemQuantity2 = gridInst.editModule.formObj.element.querySelector(
                  "#" + "ItemQuantity2"
                );
                ItemQuantity2.value = "0";
                event.itemData.ItemQuantity2 = "0";

                // let ItemQuantity3 = gridInst.editModule.formObj.element.querySelector(
                //   '#' + gridInst.element.id + 'ItemQuantity3'
                // )
                // ItemQuantity3.value = '0'
                // event.itemData.ItemQuantity3 = '0'

                let BaseItemQuantity = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "BaseItemQuantity"
                );
                BaseItemQuantity.value = _this.returnUpdatedValue(
                  event.itemData,
                  "BaseItemQuantity"
                );

                let MRP = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "MRP"
                );
                MRP.value = this.$options.filters.toFixed(
                  event && event.itemData ? event.itemData.MRP : 0
                );

                let SalesPrice = gridInst.editModule.formObj.element.querySelector(
                  "#" + "SalesPrice"
                );
                SalesPrice.value = this.$options.filters.toFixed(
                  event && event.itemData ? event.itemData.SalesPrice : 0
                );

                let Discount = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "Discount"
                );
                Discount.value =
                  event && event.itemData && event.itemData.Discount
                    ? event.itemData.Discount
                    : "0";

                let ItemExciseTax = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "ItemExciseTax"
                );
                event.itemData.ItemQuantity = _this.returnUpdatedValue(
                  event.itemData,
                  "ItemQuantity"
                );
                ItemExciseTax.value = _this.returnUpdatedValue(
                  event.itemData,
                  "ItemExciseTax"
                );

                let LineNetAmount = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "LineNetAmount"
                );
                LineNetAmount.value = this.$options.filters.toFixed(
                  _this.returnUpdatedValue(event.itemData, "LineNetAmount")
                );
                _this.rowUpdatedData = event.itemData;
                console.log(_this.rowUpdatedData, "_this.rowUpdatedData");
              } else {
                let ItemDescription = gridInst.editModule.formObj.element.querySelector(
                  "#" + "ItemDescription"
                );
                ItemDescription.value = "";

                let SubHierarchyCode = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "SubHierarchyCode"
                );
                SubHierarchyCode.value = "";

                let ItemQuantity1 = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "ItemQuantity1"
                );
                ItemQuantity1.value = "0";

                let ItemQuantity2 = gridInst.editModule.formObj.element.querySelector(
                  "#" + "ItemQuantity2"
                );
                ItemQuantity2.value = "0";

                // let ItemQuantity3 = gridInst.editModule.formObj.element.querySelector(
                //   '#' + gridInst.element.id + 'ItemQuantity3'
                // )
                // ItemQuantity3.value = '0'

                let BaseItemQuantity = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "BaseItemQuantity"
                );
                BaseItemQuantity.value = "0";

                let MRP = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "MRP"
                );
                MRP.value = "0.00";

                let SalesPrice = gridInst.editModule.formObj.element.querySelector(
                  "#" + "SalesPrice"
                );
                SalesPrice.value = "0.00";

                let Discount = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "Discount"
                );
                Discount.value = "0";

                let ItemExciseTax = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "ItemExciseTax"
                );
                ItemExciseTax.value = "0";

                let LineNetAmount = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "LineNetAmount"
                );
                LineNetAmount.value = "0.00";
                _this.rowUpdatedData = { ..._this.soLineItem };
              }
            },
          },
        }),
      };
    },
    descriptionEditTemplate() {
      let _this = this;
      return {
        template: Vue.component("itemcodeTemplate", {
          template: `<ejs-autocomplete
                ref="description_item_search"
                v-model="data.ItemDescription"
                id="ItemDescription"
                name="ItemDescription"
                :dataSource="productMaster"
                :fields="productSearchFields"
                :filtering="getProducts"
                :focus="getProducts"
                @change="changeSelectedProduct"
              ></ejs-autocomplete>`,
          data() {
            return {
              data: {},
              productMaster: [],
              productSearchFields: {
                text: "ItemDescription",
                value: "ItemDescription",
              },
            };
          },
          methods: {
            getProducts(searchText) {
              console.log("getProducts ==>", searchText);
            },
            changeSelectedProduct(event) {
              console.log("this.changeSelectedProduct", event);
              if (!event.isInteracted) {
                return;
              }
              let gridInst;
              gridInst = this.$root.$children[0].$refs.SO_lineItem_Grid
                .ej2Instances;
              console.log(gridInst, "Current grid instance");
              if (
                event.value !== "" &&
                event.itemData &&
                event.itemData.ItemNumber
              ) {
                let ItemDescription = gridInst.editModule.formObj.element.querySelector(
                  "#" + "ItemDescription"
                );
                ItemDescription.value =
                  event && event.itemData ? event.itemData.ItemDescription : "";

                let SubHierarchyCode = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "SubHierarchyCode"
                );
                SubHierarchyCode.value =
                  event && event.itemData && event.itemData.SubHierarchyCode
                    ? event.itemData.SubHierarchyCode
                    : "";

                let ItemQuantity1 = gridInst.editModule.formObj.element.querySelector(
                  "#ItemQuantity1"
                );
                ItemQuantity1.value = "1";
                event.itemData.ItemQuantity1 = "1";

                let ItemQuantity2 = gridInst.editModule.formObj.element.querySelector(
                  "#" + "ItemQuantity2"
                );
                ItemQuantity2.value = "0";
                event.itemData.ItemQuantity2 = "0";

                // let ItemQuantity3 = gridInst.editModule.formObj.element.querySelector(
                //   '#' + gridInst.element.id + 'ItemQuantity3'
                // )
                // ItemQuantity3.value = '0'
                // event.itemData.ItemQuantity3 = '0'

                let BaseItemQuantity = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "BaseItemQuantity"
                );
                BaseItemQuantity.value = _this.returnUpdatedValue(
                  event.itemData,
                  "BaseItemQuantity"
                );

                let MRP = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "MRP"
                );
                MRP.value = this.$options.filters.toFixed(
                  event && event.itemData ? event.itemData.MRP : 0
                );

                let SalesPrice = gridInst.editModule.formObj.element.querySelector(
                  "#" + "SalesPrice"
                );
                SalesPrice.value = this.$options.filters.toFixed(
                  event && event.itemData ? event.itemData.SalesPrice : 0
                );

                let Discount = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "Discount"
                );
                Discount.value =
                  event && event.itemData && event.itemData.Discount
                    ? event.itemData.Discount
                    : "0";

                let ItemExciseTax = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "ItemExciseTax"
                );
                event.itemData.ItemQuantity = _this.returnUpdatedValue(
                  event.itemData,
                  "ItemQuantity"
                );
                ItemExciseTax.value = _this.returnUpdatedValue(
                  event.itemData,
                  "ItemExciseTax"
                );

                let LineNetAmount = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "LineNetAmount"
                );
                LineNetAmount.value = this.$options.filters.toFixed(
                  _this.returnUpdatedValue(event.itemData, "LineNetAmount")
                );
                _this.rowUpdatedData = event.itemData;
                console.log(_this.rowUpdatedData, "_this.rowUpdatedData");
              } else {
                let ItemDescription = gridInst.editModule.formObj.element.querySelector(
                  "#" + "ItemDescription"
                );
                ItemDescription.value = "";

                let SubHierarchyCode = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "SubHierarchyCode"
                );
                SubHierarchyCode.value = "";

                let ItemQuantity1 = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "ItemQuantity1"
                );
                ItemQuantity1.value = "0";

                let ItemQuantity2 = gridInst.editModule.formObj.element.querySelector(
                  "#" + "ItemQuantity2"
                );
                ItemQuantity2.value = "0";

                // let ItemQuantity3 = gridInst.editModule.formObj.element.querySelector(
                //   '#' + gridInst.element.id + 'ItemQuantity3'
                // )
                // ItemQuantity3.value = '0'

                let BaseItemQuantity = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "BaseItemQuantity"
                );
                BaseItemQuantity.value = "0";

                let MRP = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "MRP"
                );
                MRP.value = "0.00";

                let SalesPrice = gridInst.editModule.formObj.element.querySelector(
                  "#" + "SalesPrice"
                );
                SalesPrice.value = "0.00";

                let Discount = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "Discount"
                );
                Discount.value = "0";

                let ItemExciseTax = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "ItemExciseTax"
                );
                ItemExciseTax.value = "0";

                let LineNetAmount = gridInst.editModule.formObj.element.querySelector(
                  "#" + gridInst.element.id + "LineNetAmount"
                );
                LineNetAmount.value = "0.00";
                _this.rowUpdatedData = { ..._this.soLineItem };
              }
            },
          },
        }),
      };
    },
    descriptionViewTemplate() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div class="p-2">
            {{ data.ItemDescription }}
          </div>
          `,
        }),
      };
    },
    UOM0EditTemplate() {
      let _this = this;
      return {
        template: Vue.component("columnTemplate", {
          template: `
            <span>
              <input maxlength="8" v-model="data.ItemQuantity1" name="ItemQuantity1" id="ItemQuantity1"
                class="e-field e-input e-defaultcell e-control e-textbox e-lib" @keyup="updateUOM0">
            </span>
          `,
          data() {
            return {
              data: {},
            };
          },
          methods: {
            updateUOM0(event) {
              console.log("this.updateUOM0 from Grid", event);
              let gridInst;
              gridInst = this.$root.$children[0].$refs.SO_lineItem_Grid
                .ej2Instances;
              console.log(gridInst, "Current grid instance");
              _this.rowUpdatedData.ItemQuantity1 = JSON.parse(
                JSON.stringify(event.target.value)
              );
              let BaseItemQuantity = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "BaseItemQuantity"
              );
              BaseItemQuantity.value = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "BaseItemQuantity"
              );
              let ItemExciseTax = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "ItemExciseTax"
              );
              _this.rowUpdatedData.ItemQuantity = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "ItemQuantity"
              );
              _this.rowUpdatedData.TaxPercentage = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "TaxPercentage"
              );
              ItemExciseTax.value = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "ItemExciseTax"
              );
              let LineNetAmount = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "LineNetAmount"
              );
              LineNetAmount.value = this.$options.filters.toFixed(
                _this.returnUpdatedValue(_this.rowUpdatedData, "LineNetAmount")
              );
            },
          },
        }),
      };
    },
    UOM0ViewTemplate() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div style="display: flex; flex-direction: row;">
            <div>
              {{ data.ItemQuantity1 }}
            </div>
            <div>
              <div style="flex-direction:column;">
                <div style="height: 10px; font-weight: 600;font-style: italic; margin-bottom: 3px;">{{ data.UnitsOfMeasure }}</div>
            </div></div>
          </div>`,
        }),
      };
    },
    UOM1EditTemplate() {
      let _this = this;
      return {
        template: Vue.component("columnTemplate", {
          template: `
            <span>
              <input maxlength="8" v-model="data.ItemQuantity2" name="ItemQuantity2" id="ItemQuantity2"
                class="e-field e-input e-defaultcell e-control e-textbox e-lib" @keyup="updateUOM1">
            </span>
          `,
          data() {
            return {
              data: {},
            };
          },
          methods: {
            updateUOM1(event) {
              console.log("this.updateUOM1 from Grid", event);
              let gridInst;
              gridInst = this.$root.$children[0].$refs.SO_lineItem_Grid
                .ej2Instances;
              console.log(gridInst, "Current grid instance");
              _this.rowUpdatedData.ItemQuantity2 = JSON.parse(
                JSON.stringify(event.target.value)
              );
              let BaseItemQuantity = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "BaseItemQuantity"
              );
              BaseItemQuantity.value = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "BaseItemQuantity"
              );
              let ItemExciseTax = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "ItemExciseTax"
              );
              _this.rowUpdatedData.ItemQuantity = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "ItemQuantity"
              );
              _this.rowUpdatedData.TaxPercentage = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "TaxPercentage"
              );
              ItemExciseTax.value = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "ItemExciseTax"
              );
              let LineNetAmount = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "LineNetAmount"
              );
              LineNetAmount.value = this.$options.filters.toFixed(
                _this.returnUpdatedValue(_this.rowUpdatedData, "LineNetAmount")
              );
            },
          },
        }),
      };
    },
    UOM1ViewTemplate() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div style="display: flex; flex-direction: row;">
            <div>
              {{ data.ItemQuantity2 }}
            </div>
            <div>
              <div  style="flex-direction:column;">
                <div style="height: 10px; font-weight: 600;font-style: italic; margin-bottom: 3px;">{{ data.BaseUOM }}</div>
                <div style="font-weight: 600;font-style: italic;">{{ data.BUOMConversion }}</div>
            </div></div>
          </div>`,
        }),
      };
    },
    MrpViewTemplate: function() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div>
            {{ $options.filters.currency(data.MRP) }}
          </div>`,
        }),
      };
    },
    ItemPriceViewTemplate: function() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div>
            {{ $options.filters.currency(data.SalesPrice) }}
          </div>`,
        }),
      };
    },
    ItemPriceEditTemplate: function() {
      let _this = this;
      return {
        template: Vue.component("columnTemplate", {
          template: `
            <span>
              <input maxlength="8" v-model="data.SalesPrice" name="SalesPrice" id="SalesPrice"
                class="e-field e-input e-defaultcell e-control e-textbox e-lib" @keyup="updatePrice">
            </span>
          `,
          data() {
            return {
              data: {},
            };
          },
          methods: {
            updatePrice(event) {
              console.log("this.updatePrice from Grid", event);
              let gridInst;
              gridInst = this.$root.$children[0].$refs.SO_lineItem_Grid
                .ej2Instances;
              console.log(gridInst, "Current grid instance");
              // update new value to global rowUpdatedDate obj
              _this.rowUpdatedData.SalesPrice = JSON.parse(
                JSON.stringify(event.target.value)
              );
              let BaseItemQuantity = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "BaseItemQuantity"
              );
              BaseItemQuantity.value = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "BaseItemQuantity"
              );
              let ItemExciseTax = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "ItemExciseTax"
              );
              _this.rowUpdatedData.ItemQuantity = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "ItemQuantity"
              );
              _this.rowUpdatedData.TaxPercentage = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "TaxPercentage"
              );
              ItemExciseTax.value = _this.returnUpdatedValue(
                _this.rowUpdatedData,
                "ItemExciseTax"
              );
              let LineNetAmount = gridInst.editModule.formObj.element.querySelector(
                "#" + gridInst.element.id + "LineNetAmount"
              );
              LineNetAmount.value = this.$options.filters.toFixed(
                _this.returnUpdatedValue(_this.rowUpdatedData, "LineNetAmount")
              );
            },
          },
        }),
      };
    },
    taxViewTemplate: function() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div>
            {{ $options.filters.currency(data.ItemExciseTax) }}
          </div>`,
        }),
      };
    },
    freeViewTemplate: function() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div class="grid-input-center">
            <input class="" type="checkbox" name="IsFreeGood" id="IsFreeGood" v-model="data.IsFreeGood" :checked="data.IsFreeGood" disabled>
          </div>`,
        }),
      };
    },
    freeEditTemplate: function() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div class="grid-input-center">
            <input class="" type="checkbox" name="IsFreeGood" id="IsFreeGood" v-model="data.IsFreeGood" :checked="data.IsFreeGood" disabled>
          </div>`,
        }),
      };
    },
    lineNetAmountViewTemplate: function() {
      return {
        template: Vue.component("columnTemplate", {
          template: `
          <div>
            {{ $options.filters.currency(data.LineNetAmount) }}
          </div>`,
        }),
      };
    },
    /**
     * INLINE TEMPLATES ENDS HERE
     */
  },
  provide: {
    grid: [Edit, Toolbar, ColumnChooser, Resize, CommandColumn, Page],
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
