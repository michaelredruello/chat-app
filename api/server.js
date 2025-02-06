import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK with Environment Variables
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore();

// API Route to Delete Messages
app.get("/deleteMessages", async (req, res) => {
  try {
    const messagesRef = db.collection("messages");
    const snapshot = await messagesRef.get();

    if (snapshot.empty) {
      return res.status(200).json({ message: "No messages found." });
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
    res
      .status(200)
      .json({
        message: "Messages deleted successfully!",
        count: snapshot.size,
      });
  } catch (error) {
    console.error("Error deleting messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
