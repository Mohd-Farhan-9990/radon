const express = require('express');
const externalModule = require('../logger/logger.js')
const help = require('../util/helper.js')
const format = require('../validator/formatter.js')
const router = express.Router();

router.get('/test-me', function (req, res) {
    // console.log('The constant in logger route has a value '+externalModule.endpoint)
    externalModule.wel()
    help.pda()
    help.pmont()
    help.batch()
    format.tr()
    format.lower()
    format.upper()
    res.send('My first ever api!')
});

router.get('/solution1', function (req, res) {
        let arr = [1,2,3,4,5,7]
        let n = arr.length+1
        console.log(n-1)
       
        let sum = n*(n+1)/2
         let sum2 = 0;
      for (let i=0; i<n-1; i++){
            sum2 = sum2 + arr[i]   
        }
        let missingNumber = sum - sum2
        res.send({data:missingNumber})

});
router.get('/solution2', function (req, res) {
    // const index = req.param.indexNumber
        let arr = [11,12,14,16,17]
        let len = arr.length
        let first = arr[0]
        let n = len+1
        let last = arr[len-1]
        let sum = n*(first+last)/2
        let sum2 = 0 
        for(let i=0; i<=len-1; i++){
                sum2 = sum2 + arr[i]
        }
        let missingNumber = sum - sum2
        res.send({data:missingNumber})
    })
    

    router.get('/movies', function (req, res) {

        const arr = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
        res.send(arr)

});
router.get('/movies/:indexNumber', function (req, res) {
    const index = req.params.indexNumber
    
    const arr = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    if(index >arr.length){
        res.send("This is not a valid index")
    }
    res.send(arr[index])


});

router.get('/films', function (req, res) {
    const index = req.params.indexNumber
    
    const arr = [ {
        "id":1,
        "name":"The Shining"
    },
    {
        "id":2,
        "name":"Incendies"
    },
    {
        "id":3,
        "name":"Rang De Basanti"
    },
    {
        "id":4,
        "name":"Finding Nemo"
    }
    ]
      
    res.send(arr)


});


router.get('/films/:filmId', function (req, res) {
    const index = req.params.filmId
    const arr = [ {
        "id":1,
        "name":"The Shining"
    },
    {
        "id":2,
        "name":"Incendies"
    },
    {
        "id":3,
        "name":"Rang De Basanti"
    },
    {
        "id":4,
        "name":"Finding Nemo"
    }
    ]
    const len = arr.length

    for(let i=0; i<len; i++)
        if(index == arr[i].id){
            res.send(arr[i])
        }
        res.send("No Movies Exist With This ID")

});
module.exports = router;
// adding this comment for no reason