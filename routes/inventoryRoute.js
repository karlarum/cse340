// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));

// Route to build vehicle management view
router.get("/", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.buildManagementView)
);
// Route to build add-classification view
router.get("/add-classification", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.buildAddClassification)
);
// Process the add-classification view
router.post("/add-classification", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.addClassification)
);
// Route to build add-inventory view
router.get("/add-inventory", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.buildAddInventory)
);
// Process add new inventory data
router.post("/add-inventory", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  invValidate.addInventoryRules(),
  invValidate.checkAddInventoryData,
  utilities.handleErrors(invController.addInventory)
);

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))
// Route to edit inventory item
router.get("/edit/:invId", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.editInventoryView)
);
// Route to update inventory item
router.post("/update/",
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  invValidate.addInventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);
// Route to build delete inventory view
router.get("/delete/:inv_id", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.deleteInventoryView)
);
// Route to process the delete inventory operation
router.post("/delete", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.deleteInventory)
);
// Route to build delete classification view
router.get("/delete-classification/:classification_id", 
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.deleteClassificationView)
)
// Route to process the delete classification operation
router.post("/delete-classification",
  utilities.checkLogin,
  utilities.checkEmployeeAdmin,
  utilities.handleErrors(invController.deleteClassification)
)

module.exports = router;