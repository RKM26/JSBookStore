var db = openDatabase("store1", "1.0", "book store1", 2 * 1024 * 1024);

document.addEventListener("DOMContentLoaded", function (e) {
  const s = JSON.parse(localStorage.getItem("purchaseItem"));

  async function request() {
    return new Promise((resolve) => {
      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT * FROM addToCart",
          [],
          function (tx, results) {
            let imgArray = [];
            var len = results.rows.length,
              i;
            for (i = 0; i < len; i++) {
              imgArray.push(results.rows.item(i).id);
            }
            resolve(imgArray);
          },
          null
        );
      });
    });
  }
  request().then((imgArray) => {
    var str = imgArray.toString();
    console.log("strrrr", str);

    async function request1() {
      return new Promise((resolve) => {
        db.transaction(function (tx) {
          tx.executeSql(
            `SELECT * FROM bookStore2 WHERE ID IN (${str})`,
            [],
            function (tx, results) {
              let price = [];
              var len = results.rows.length,
                i;

              for (i = 0; i < len; i++) {
                price.push(results.rows.item(i).price);
              }

              console.log("arrr111", price);
              resolve(price);
            },
            null
          );
        });
      });
    }

    request1()
      .then((priceArray) => {
        let sum = 0;
        for (var i = 0; i < priceArray.length; i++) {
          sum = sum + priceArray[i];
        }
        document.getElementById("finalPriceLabel").innerHTML = "₹: " + sum;
        console.log("Total sum = ", sum);
      })
      .catch((e) => {
        console.log("error", e);
      });

    // }
  });
});
