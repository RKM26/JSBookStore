var db = openDatabase('store1', '1.0', 'book store1', 2 * 1024 * 1024); 

document.addEventListener('DOMContentLoaded',function(e){
    db.transaction(function (tx){
        tx.executeSql('Create Table If Not Exists bookStore2 (id, bookName, authorName, price, description)')
        tx.executeSql("Create Table If Not Exists addToCart (id unique)");
    })
    addInArray()
})



var arr=[]
function createBookObj(bookName,authorName,price,description){
    return{
        bookName:bookName,
        authorName:authorName,
        price:price,
        description:description
    }
}

function addInArray(){
    // alert("inside add array")
    const obj1=createBookObj('The Alchemist','Paulo Coelho',150,"Paulo Coelho's enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Along the way he meets a Gypsy woman, a man who calls himself king, and an alchemist, all of whom point Santiago in the direction of his quest. No one knows what the treasure is, or if Santiago will be able to surmount the obstacles in his path. But what starts out as a journey to find worldly goods turns into a discovery of the treasure found within. Lush, evocative, and deeply humane, the story of Santiago is an eternal testament to the transforming power of our dreams and the importance of listening to our hearts" )
    const obj2=createBookObj('1984','George Orwell',180,"Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmarish vision of a totalitarian, bureaucratic world and one poor stiff's attempt to find individuality. The brilliance of the novel is Orwell's prescience of modern life—the ubiquity of television, the distortion of the language—and his ability to construct such a thorough version of hell. Required reading for students since it was published, it ranks among the most terrifying novels ever written.")
    const obj3=createBookObj('The Great Gatsby','F. Scott Fitzgerald',200,"The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession,' it is an exquisitely crafted tale of America in the 1920s.The Great Gatsby is one of the great classics of twentieth-century literature.")
    const obj4=createBookObj('The Old Man and the Sea','Ernest Hemingway',200,"The last novel Ernest Hemingway saw published, The Old Man and the Sea has proved itself to be one of the enduring works of American fiction. It is the story of an old Cuban fisherman and his supreme ordeal: a relentless, agonizing battle with a giant marlin far out in the Gulf Stream. Using the simple, powerful language of a fable, Hemingway takes the timeless themes of courage in the face of defeat and personal triumph won from loss and transforms them into a magnificent twentieth-century classic.")
    const obj5=createBookObj('The Hobbit There and Back Again','J.R.R. Tolkien',300,"In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort. Written for J.R.R. Tolkien’s own children, The Hobbit met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ring, and the cruel dragon Smaug the Magnificent. The text in this 372-page paperback edition is based on that first published in Great Britain by Collins Modern Classics (1998), and includes a note on the text by Douglas A. Anderson (2001). Unforgettable!")
    const obj6=createBookObj('Murder on the Orient Express','Agatha Christie',250,"Le train est aussi dangereux que le paquebot » affirme Hercule Poirot… Le lendemain, dans une voiture de l’Orient-Express bloqué par les neiges yougoslaves, on découvre le cadavre d’un américain lardé de douze coups de couteau. L’assassin n’a pu venir de l’extérieur : voici donc un huis clos, le plus fameux, peut-être, de toute la littérature policière. Pour mener son enquête, le petit détective belge a le choix entre une princesse russe, une Américaine fantasque, le secrétaire de la victime, un couple de Hongrois distingués, l’inévitable colonel de retour des Indes, les domestiques de tout ce beau monde et le contrôleur du train.")
    const obj7=createBookObj('The Little Prince','Antoine de Saint-Exupéry',220,"Moral allegory and spiritual autobiography, The Little Prince is the most translated book in the French language. With a timeless charm it tells the story of a little boy who leaves the safety of his own tiny planet to travel the universe, learning the vagaries of adult behaviour through a series of extraordinary encounters. His personal odyssey culminates in a voyage to Earth and further adventures.")
    const obj8=createBookObj('The Metamorphosis','Franz Kafka',350,"As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. He was laying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his domelike brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyesWith it's startling, bizarre, yet surprisingly funny first opening, Kafka begins his masterpiece, The Metamorphosis. It is the story of a young man who, transformed overnight into a giant beetle-like insect, becomes an object of disgrace to his family, an outsider in his own home, a quintessentially alienated man. A harrowing—though absurdly comic—meditation on human feelings of inadequacy, guilt, and isolation, The Metamorphosishas taken its place as one of the most widely read and influential works of twentieth-century fiction. As W.H. Auden wrote, 'Kafka is important to us because his predicament is the predicament of modern man.'")
    const obj9=createBookObj('A Study in Scarlet','Arthur Conan Doyle',350,"There's a scarlet thread of murder running through the colourless skein of life, and our duty is to unravel it, and isolate it, and expose every inch of it.'From the moment Dr John Watson takes lodgings in Baker Street with the consulting detective Sherlock Holmes, he becomes intimately acquainted with the bloody violence and frightening ingenuity of the criminal mind.In A Study in Scarlet , Holmes and Watson's first mystery, the pair are summoned to a south London house where they find a dead man whose contorted face is a twisted mask of horror. The body is unmarked by violence but on the wall a mysterious word has been written in blood.The police are baffled by the crime and its circumstances. But when Sherlock Holmes applies his brilliantly logical mind to the problem he uncovers a tragic tale of love and deadly revenge .")
    const obj10=createBookObj('Do Androids Dream of Electric Sheep?','Philip K. Dick',450,"It was January 2021, and Rick Deckard had a license to kill.Somewhere among the hordes of humans out there, lurked several rogue androids. Deckard's assignment--find them and then...'retire' them. Trouble was, the androids all looked exactly like humans, and they didn't want to be found!")
    const obj11=createBookObj('Chess Story','Stefan Zweig',300,"Chess Story, also known as The Royal Game, is the Austrian master Stefan Zweig's final achievement, completed in Brazilian exile and sent off to his American publisher only a matter of days before his suicide in 1942. It is the only story in which Zweig looks at Nazism, and he does so with characteristic emphasis on the psychological.Travelers by ship from New York to Buenos Aires find that on board with them is the world champion of chess, an arrogant and unfriendly man. They come together to try their skills against him and are soundly defeated. Then a mysterious passenger steps forward to advise them and their fortunes change. How he came to possess his extraordinary grasp of the game of chess and at what cost lie at the heart of Zweig's story. This new translation of Chess Story brings out the work's unusual mixture of high suspense and poignant reflection.")
    const obj12=createBookObj('The Time Machine','H.G. Wells',450,"“I’ve had a most amazing time....”So begins the Time Traveller’s astonishing firsthand account of his journey 800,000 years beyond his own era—and the story that launched H.G. Wells’s successful career and earned him his reputation as the father of science fiction. With a speculative leap that still fires the imagination, Wells sends his brave explorer to face a future burdened with our greatest hopes...and our darkest fears. A pull of the Time Machine’s lever propels him to the age of a slowly dying Earth.  There he discovers two bizarre races—the ethereal Eloi and the subterranean Morlocks—who not only symbolize the duality of human nature, but offer a terrifying portrait of the men of tomorrow as well.  Published in 1895, this masterpiece of invention captivated readers on the threshold of a new century. Thanks to Wells’s expert storytelling and provocative insight, The Time Machinewill continue to enthrall readers for generations to come.")
    // console.log(obj1);
    arr.push(obj1,obj2,obj3,obj4,obj5,obj6,obj7,obj8,obj9,obj10,obj11,obj12)
    localStorage.setItem("bookDBTest",JSON.stringify(arr))
    
   
    insertInitialData()

}

function insertInitialData(){
    // alert("inside insert")

    const data=JSON.parse(localStorage.getItem("bookDBTest"))
    console.log("data",data);

    try{
    db.transaction(function (tx) { 

        const data=JSON.parse(localStorage.getItem("bookDBTest"))
        var i=0;
        data.forEach(element => {
            let id=++i;
        const bName=element.bookName
        const aName=element.authorName
        const p=element.price
        const d=element.description
            console.log(bName);

    //         tx.executeSql("DROP TABLE bookStore2",[], 
    // function(tx,results){console.log("Successfully Dropped")},
    // function(tx,error){console.log("Could not delete")}
    //         );
            // tx.executeSql("INSERT INTO bookStore2 (id, bookName, authorName, price, description) VALUES (?, ?, ?, ?, ?)",[id,bName,aName,p,d]);
        });
    
        // alert("store in db")
     })
    }catch{
        // alert("error in db")
    }
}


function show(){
    // alert("clicked")
     db.transaction(function (tx) { 
    tx.executeSql('SELECT * FROM bookStore2', [], function (tx, results) { 
       var len = results.rows.length, i; 
       msg = "<p>Found rows: " + len + "</p>"; 
    //    document.querySelector('#status').innerHTML +=  msg; 

       for (i = 0; i < len; i++) { 
          msg = "<p><b>" + results.rows.item(i).log + "</b></p>"; 
        //   alert(results.rows.item(i).bookName)
        //   document.querySelector('#status').innerHTML +=  msg; 
       } 
    }, null); 
 });

}




document.addEventListener("unload", function(){
//              tx.executeSql("DROP TABLE bookStore2",[], 
//     function(tx,results){console.log("Successfully Dropped")},
//     function(tx,error){console.log("Could not delete")}
//             );

                     tx.executeSql("DROP TABLE addToCart",[], 
    function(tx,results){console.log("Successfully Dropped")},
    function(tx,error){console.log("Could not delete")}
            );
    
});