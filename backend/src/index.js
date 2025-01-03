import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());
const prisma = new PrismaClient();

// {
//     "name":"Kr_Himanshu"
//     "password":"KrHimanshu"
// }
app.get("/userLogIn", async (req, res) => {
  const { name, password } = req.query;

  // Validate input
  if (!name?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Required field is missing" });
  }

  try {
    // Retrieve the user with associated posts
    const user = await prisma.user.findFirst({
      where: { name }, // Search by 'name'
      include: {
        posts: true, // Include associated posts
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }

    res.status(200).json({
      message: "Logged in Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

// {
//     "name":"Kr_Himanshu"
//     "password":"KrHimanshu"
// }
app.get("/getPost", async (req, res) => {
  const { name } = req.query; // Extract 'name' from query parameters

  // Validate input
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Retrieve the user based on the provided name
    const user = await prisma.user.findUnique({
      where: { name: name }, // Search user by name
      include: {
        posts: true, // Include posts related to the user
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user exists, return their posts
    res.status(200).json({
      message: "Posts retrieved successfully",
      posts: user.posts, // Return the posts of the user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
});

// {
//   "name":"Kr_Himanshu"
// }
app.get("/getUser", async (req, res) => {
  const { name } = req.query; // Extract 'name' from the query string
  // console.log("This is the name from query string: " + name);

  // Validate input
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Retrieve the user with associated posts
    const user = await prisma.user.findUnique({
      where: { name: name }, // Search by 'name'
      include: {
        posts: true, // Include associated posts
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
});

app.get("/getFeed", async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await prisma.post.findMany({
      include: {
        author: true, // Include the author details
        comments: true, // Include the comments on the posts
      },
      orderBy: {
        createdAt: "desc", // Order posts by uploadTime in descending order
      },
    });

    // Respond with the posts
    res.status(200).json({
      message: "Feed retrieved successfully",
      posts, // Return the posts
    });
  } catch (error) {
    console.error("Error retrieving feed:", error);
    res.status(500).json({
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
});

// {
//   "name":"Kr_Ankit",
//   "email":"krankit@gmail.com",
//   "password":"KrAnkit"
// }
app.post("/newUser", async (req, res) => {
  const body = req.body;
  try {
    // check if username is already taken
    const userExists = await prisma.user.findUnique({
      where: { name: body.name },
    });
    if (userExists) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // if username is not taken create new user
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create the user",
      error: error.message,
    });
  }
});

// {
//   "content": "This is the demo post",
//   "authorId": "Kr_Himanshu"
// }
app.post("/newPost", async (req, res) => {
  const body = req.body;

  try {
    // Check if the User exists
    console.log(body);
    const user = await prisma.user.findUnique({
      where: { name: body.name },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the Post
    const post = await prisma.post.create({
      data: {
        content: body.content,
        author: {
          connect: { name: body.name }, // Connect using the author's name
        },
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
});

// {
//     "comment":"This is a demo comment",
//     "postId":"543befa4-8d9b-4bb1-8d4f-20c64276a6e6",
//     "authorId":"1128e374-7e13-417e-b49c-d73cd9c717df"
// }
app.post("/newComment", async (req, res) => {
  const body = req.body;

  if (!body.comment || !body.postId || !body.authorId) {
    return res.status(400).json({
      error: "Missing required fields: comment, postId, or authorId.",
    });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        comment: body.comment,
        postId: body.postId,
        authorId: body.authorId,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the comment." });
  }
});

// {
//   "postId":"b8fe2593-b830-4241-be2c-054d662cae30",
//   "content":"This is the updated post"
// }
app.patch("/updatePost", async (req, res) => {
  const body = req.body; // Extract post ID and new content from the request body

  // Validate input
  if (!body.postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }
  if (!body.content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: body.postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: body.postId },
      data: { content: body.content }, // Ensure data is structured as an object
    });

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update post",
      error: error.message,
    });
  }
});

// {
//   "postId":"543befa4-8d9b-4bb1-8d4f-20c64276a6e6"
// }
app.patch("/newLike", async (req, res) => {
  const body = req.body;

  if (!body.postId) {
    return res.status(400).json({ error: "Missing required field: postId." });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id: body.postId },
      data: {
        like: { increment: 1 },
      },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "An error occurred while updating likes." });
  }
});

// {
//   "postId":"b8fe2593-b830-4241-be2c-054d662cae30"
// }
app.delete("/deletePost", async (req, res) => {
  const body = req.body; // Extract post ID from the request body

  // Validate input
  if (!body.postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: body.postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: body.postId },
    });

    res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete post",
      error: error.message,
    });
  }
});

// {
//   "commentId":"5bf5214a-31c8-4bca-8ec0-e65261ee2566"
// }
app.delete("/deleteComment", async (req, res) => {
  const body = req.body;

  // Validate input
  if (!body.commentId) {
    return res
      .status(400)
      .json({ error: "Missing required field: commentId." });
  }

  try {
    // Delete the comment from the database
    const deletedComment = await prisma.comment.delete({
      where: { id: body.commentId },
    });

    res.status(200).json({
      message: "Comment deleted successfully.",
      deletedComment,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);

    if (error.code === "P2025") {
      // Prisma-specific error for record not found
      return res
        .status(404)
        .json({ error: "Comment not found. Unable to delete." });
    }

    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
