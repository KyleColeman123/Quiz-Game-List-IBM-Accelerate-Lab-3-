/**
 * This is where you will create routes for our
 * questions API
 * Base url: /api/questions
 * We have imported express and router and
 * exported the router. 
 * 
 * Your task is to fill in the router with appropriate
 * routes and implement the functionality of getting
 * data from mongodb and return appropriate results
 */

const express = require('express');
const router = express.Router();

// Question Data
const Questions = require('../../models/questions-data.json')
// Hint: get a bonus task here
const shuffleArray = require('../../utils/shuffle');


/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 * 
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 * 
 */
router.get('/', (req, res) => {
  let questionsCopy = Questions.map((elem, index) => {
    return {
      question: elem.question,
      options: elem.options,
      id: (1000 * (index + 1)).toString()
    }
  })

  res.send(questionsCopy)
})

/**
 * Route details
 * api GET /api/questions/count
 * Description: This will get the count of the questions
 * from the database and return it 
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
router.get('/count', (req, res) => {
  res.send({
    count: Object.keys(Questions).length
  })
})

/**
 * Route details
 * api GET /api/questions/:qId
 * Description: This will get one question given the question ID
 * Structure of the return JSON:
 * {
 *    question: 'sample question',
 *    options: [
 *      'option1',
 *      'option2'
 *    ],
 *    id: '1234'
 * }
 */
router.get('/:qId', (req, res) => {

  res.status(500).send({
    error: 'not implemented'
  })
})


/**
 * Route details
 * api POST /api/questions/result
 * Description: This will receive a body with user
 * entered answers and will return the results. 
 * Calculation of the result will happen here and you
 * would only send the results.
 * 
 * Structure of body JSON:
 * {
 *    'questionID': 'user-answer',
 *    'questionID': 'user-answer'
 * }
 * 
 * Structure of the return JSON:
 * {
 *    summary: 'passed OR failed',
 *    score: (how many answers were correct),
 *    total: (how many questions were there)
 * }
 */
router.post('/result', (req, res) => {
  let scoreCount = 0
  let result = "failed"

  //let keys = Object.keys(req.body)

  let values = Object.values(req.body)
  console.log(values)
  Questions.map((q) => {
    if(values.includes(q.answer)){
      scoreCount = scoreCount + 1;
    }
    if(scoreCount >= 3){
      result = "passed"
    }
  })

  
  res.send({
      summary: result,
      score: scoreCount,
      total: 4
  })
})


module.exports = router;
