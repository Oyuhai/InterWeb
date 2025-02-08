const express = require("express");
const router = express.Router();
const { signupUser, signinUser, getProfile } = require("../controller/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Shine hereglegch burtguuleh
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               jobTitle:
 *                 type: string
 *     responses:
 *       201:
 *         description: Amjilttai
 *       400:
 *         description: medeelel dutuu
 *       500:
 *         description: serveriin aldaa
 */
router.post("/signup", signupUser);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Authenticate 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: amjilttai
 *       400:
 *         description: medeelel dutuu
 *       500:
 *         description: serveriin aldaa
 */
router.post("/signin", signinUser);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: hereglegchiin ID_r profile tatah
 *     responses:
 *       200:
 *         description: amjilttai
 *       400:
 *         description: userID oldoogui
 *       404:
 *         description: hereglegch oldoogui
 *       500:
 *         description: serveriin aldaa
 */
router.get('/profile', getProfile);

module.exports = router;
