var db = openDatabase("store1", "1.0", "book store1", 2 * 1024 * 1024);
window.onload = function () {
  async function request() {
    return new Promise((resolve) => {
      db.transaction(function (tx) {
        tx.executeSql(
          "SELECT * FROM bookStore2",
          [],
          function (tx, results) {
            let imgArray = [];
            var len = results.rows.length,
              i;
            for (i = 0; i < len; i++) {
              imgArray.push(results.rows.item(i).bookName);
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
      for (var i = 0; i < imgArray.length; i++) {
        var col1 = document.createElement("div");
        col1.setAttribute("class", "column");
        col1.setAttribute(
          "style",
          "background-color:#000;border-radius: 25px;"
        );

        var img = document.createElement("img");
        img.setAttribute("src", `./images/${i + 1}.jpg`);
        img.setAttribute("width", "400");
        img.setAttribute("height", "320");
        img.setAttribute("class", "center");
        img.setAttribute("id", "image");
        img.setAttribute("data", i + 1);
        img.onclick = function () {
          displayInfo(this);
        };

        col1.appendChild(img);

        document.getElementById("grid-container").appendChild(col1);
      }
    })
    .catch((e) => {
      console.log("error", e);
    });
};

function displayInfo(x) {
  const value = x.getAttribute("data");
  async function request() {
    return new Promise((resolve) => {
      db.transaction(function (tx) {
        tx.executeSql(
          `SELECT * FROM bookStore2 WHERE ID = ${value}`,
          [],
          function (tx, results) {
            let imgArray = "";
            let name = "";
            let price = "";
            let description = "";
            var len = results.rows.length,
              i;

            for (i = 0; i < len; i++) {
              imgArray = results.rows.item(i).bookName;
              name = results.rows.item(i).authorName;
              price = results.rows.item(i).price;
              description = results.rows.item(i).description;
            }
            let arr1 = [imgArray, name, price, description];

            resolve(arr1);
          },
          null
        );
      });
    });
  }
  request()
    .then((arr) => {
      var modal = document.createElement("div");
      modal.setAttribute("class", "modal");
      modal.setAttribute("id", "myModal");
      modal.setAttribute("style", "");

      var modalContent = document.createElement("div");
      modalContent.setAttribute("class", "modal-content");

      var span = document.createElement("span");

      var p = document.createElement("p");
      var pText = document.createTextNode("Book Name : " + arr[0]);

      var p2 = document.createElement("p");
      var p2Text = document.createTextNode("Author Name : " + arr[1]);

      var p3 = document.createElement("button");
      var p3Text = document.createTextNode("Price : ₹" + arr[2]);
      p3.onclick = function () {
        addToCart(value);
      };

      var p4 = document.createElement("p");
      var p4Text = document.createTextNode("Description : " + arr[3]);

      p.appendChild(pText);
      p2.appendChild(p2Text);
      p3.appendChild(p3Text);
      p4.appendChild(p4Text);

      modalContent.appendChild(p);
      modalContent.appendChild(p2);

      modalContent.appendChild(p4);
      modalContent.appendChild(p3);

      modal.appendChild(modalContent);

      document.getElementById("grid-container").appendChild(modal);

      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    })
    .catch((e) => {
      console.log("error", e);
    });
}

function addToCart(id) {
  console.log(id);

  db.transaction(function (tx) {
    // tx.executeSql("Create Table If Not Exists addToCart (id unique)");
    tx.executeSql("INSERT INTO addToCart (id) VALUES (?)", [id]);
  });

  let length = 0;
  if (localStorage.getItem("purchaseItem") == null) {
    console.log("local has no value");
    length = 0;
  } else {
    length = 1;
  }
  if (length == 0) {
    console.log("inside if");
    let array = [];
    array[array.length] = id;
    localStorage.setItem("purchaseItem", JSON.stringify(array));
  } else {
    const s = JSON.parse(localStorage.getItem("purchaseItem"));
    s.forEach((element) => {
      if (element == id) {
        return;
      }
    });

    if (s.indexOf(id) > -1) {
      return;
    }
    s.push(id);

    localStorage.setItem("purchaseItem", JSON.stringify(s));
  }
  console.log(id);
}

document.addEventListener("unload", function () {
  tx.executeSql(
    "DROP TABLE bookStore2",
    [],
    function (tx, results) {
      console.log("Successfully Dropped");
    },
    function (tx, error) {
      console.log("Could not delete");
    }
  );

  //           tx.executeSql("DROP TABLE addToCart",[],
  // function(tx,results){console.log("Successfully Dropped")},
  // function(tx,error){console.log("Could not delete")}
  //  );
});
