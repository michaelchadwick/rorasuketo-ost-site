// Rorasuketo object init
if (typeof Rora === "undefined") var Rora = {};

const RORA_PROD_URL = ["rorasuketo.win"];

// set some site vars
Rora.env = RORA_PROD_URL.includes(document.location.hostname)
  ? "prod"
  : "local";

Rora.init = () => {
  // adjust <title> for env
  if (Rora.env == "local") {
    if (!document.title.includes("(LH) ")) {
      console.log("foo");
      document.title = "(LH) " + document.title;
    }
  }
};

Rora.init();
