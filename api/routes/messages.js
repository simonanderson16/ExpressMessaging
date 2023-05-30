var express = require("express");
var router = express.Router();
const db = require("../firebase")

const {getDocs, collection, query, where, updateDoc, deleteDoc, addDoc, doc, setDoc} = require("firebase/firestore")

router.get("/", function(req, res, next) {
    res.send("messaging api");
});


// get all messages
router.get("/all", async (req, res, next) => {
    console.log("all messages")
    const allDocData = []
    // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
    const docs = await getDocs(collection(db, "Messages"))
    docs.forEach((doc) => allDocData.push(doc.data()))
    console.log(allDocData)
    res.json({result: allDocData})
  })



// get all messages by user (make sure to add doc id to json)
router.get("/user/:user", async (req, res, next) => {
    const user = req.params.user;
    console.log(user);
    const allDocData = []
    // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
    const q = query(collection(db, "Messages"), where("user", "==", user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        allDocData.push({id: doc.id, user: doc.data().user, message: doc.data().message})
    });
    console.log(allDocData)
    res.json({result: allDocData})
  })



// edit message for user
router.put("/edit/:id", async (req, res, next) => {
    const docID = req.params.id;
    const newMessage = req.body.message;
    await updateDoc(doc(db, "Messages", docID), {
        message: newMessage
      }); 
  })



// delete message for user
router.delete("/delete/:id", async (req, res, next) => {
    const docID = req.params.id;
    await deleteDoc(doc(db, "Messages", docID));
  })



// add message for user
router.post("/new/:user", async (req, res, next) => {
    const user = req.params.user;
    const newMessage = req.body.message;
    try {
        const messagesCollectionRef = collection(db, "Messages");
        const newMessageRef = doc(messagesCollectionRef); // Create a new document reference
        await setDoc(newMessageRef, { user: user, message: newMessage }); // Use setDoc instead of addDoc
      
        res.sendStatus(200);
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
  })


module.exports = router;