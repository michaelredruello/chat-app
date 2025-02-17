import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore();

app.get("/deleteMessages", async (req, res) => {
  try {
    const messagesRef = db.collection("messages");
    const snapshot = await messagesRef.get();

    if (snapshot.empty) {
      return res.sendStatus(204);
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    console.log(`Deleted ${snapshot.size} messages.`);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting messages:", error);
    res.sendStatus(500);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
