/**
 * @swagger
 * tags:
 *   - name: Number/Country List
 *     description: API for managing phone numbers and countries
 */

/**
 * @swagger
 * /api/numbers/list:
 *   get:
 *     tags: [Number/Country List]
 *     summary: Retrieve a list of countries or phone numbers
 *     description: Get a list of countries or numbers based on the provided query parameters. If `country_id` is provided, it returns phone numbers associated with that country. If no `country_id` is provided, it returns a list of countries sorted by the number of phone numbers.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: User access token (don't use this header in Try It Out, use JWT auth lock instead)
 *         required: false
 *         default: Bearer access_token
 *       - in: header
 *         name: Content-Type
 *         description: The format of the body, a JSON object is expected
 *         required: true
 *         default: application/json
 *       - name: country_id
 *         in: query
 *         description: The ID of the country to retrieve associated phone numbers. Must be an integer.
 *         required: false
 *         schema:
 *           type: string
 *           example: 1
 *       - name: start
 *         in: query
 *         description: The start index for pagination of phone numbers. Must be an integer.
 *         required: false
 *         schema:
 *           type: string
 *           example: 0
 *       - name: end
 *         in: query
 *         description: The end index for pagination of phone numbers. Required if `start` is provided. Must be an integer.
 *         required: false
 *         schema:
 *           type: string
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of countries or phone numbers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 countries_list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5ec49c1d6e3493c5369ed"
 *                       name:
 *                         type: string
 *                         example: "United States"
 *                       number_count:
 *                         type: integer
 *                         example: 100
 *                 numbers_list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5ec49c1d6e3493c5369ee"
 *                       number:
 *                         type: string
 *                         example: "+1234567890"
 *       400:
 *         description: Invalid input parameters or country_id does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "country_id must be an integer"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
