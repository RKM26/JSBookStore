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

  request()
    .then((imgArray) => {
      var str = imgArray.toString();
      console.log("strrrr", str);

      async function request1() {
        return new Promise((resolve) => {
          db.transaction(function (tx) {
            tx.executeSql(
              `SELECT * FROM bookStore2 WHERE ID IN (${str})`,
              [],
              function (tx, results) {
                let id = [];
                let img = [];
                let name = [];
                let price = [];
                let description = [];
                var len = results.rows.length,
                  i;

                for (i = 0; i < len; i++) {
                  id.push(results.rows.item(i).id);
                  // console.log();
                  img.push(results.rows.item(i).bookName);
                  name.push(results.rows.item(i).authorName);
                  price.push(results.rows.item(i).price);
                  description.push(results.rows.item(i).description);
                }
                let arr1 = [id, img, name, price, description];
                console.log("arrr111", arr1);

                resolve(arr1);
              },
              null
            );
          });
        });
      }

      request1()
        .then((imgArray) => {
          for (var i = 0; i < imgArray[0].length; i++) {
            var col1 = document.createElement("div");
            col1.setAttribute("class", "column");
            col1.setAttribute(
              "style",
              "background-color:#000;border-radius: 25px;"
            );

            var img = document.createElement("img");
            img.setAttribute("src", `./images/${imgArray[0][i]}.jpg`);
            img.setAttribute("width", "400");
            img.setAttribute("height", "320");
            img.setAttribute("class", "center");
            img.setAttribute("id", "image");
            // img.setAttribute("data", i + 1);
            // img.onclick = function () {
            //   deleteFromCart(this);
            // };

            var span = document.createElement("p");
            span.setAttribute("id", "priceSpan");
            var spanText = document.createTextNode(
              "Price : ₹" + imgArray[3][i]
            );

            var btn = document.createElement("button");
            btn.setAttribute("style", "height : 30px;margin-top:10px");
            var btnText = document.createTextNode("Remove");

            var div = document.createElement("div");

            div.setAttribute("id", "btnAndSpan");

            span.appendChild(spanText);
            btn.appendChild(btnText);
            btn.setAttribute("data", imgArray[0][i]);
            btn.onclick = function () {
              deleteFromCart(this);
            };

            div.appendChild(span);
            div.appendChild(btn);

            col1.appendChild(img);
            // col1.appendChild(span)
            // col1.appendChild(btn)
            col1.appendChild(div);

            document.getElementById("grid-container").appendChild(col1);
          }
        })
        .catch((e) => {
          console.log("error", e);
        });

      // }
    })
    .catch((e) => {
      console.log("error", e);
    });
});

function deleteFromCart(id) {
  const value = id.getAttribute("data");
  console.log("clicked", value);
  db.transaction(function (tx) {
    // tx.executeSql("Create Table If Not Exists addToCart (id unique)");
    tx.executeSql("DELETE FROM addToCart WHERE id = (?)", [value]);
  });

  location.reload();
}
