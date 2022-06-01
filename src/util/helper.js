const pdat= function(){
    console.log("This is second solution")
    const d = new Date();

   console.log(  d.getDate(),d.getMonth()+1,d.getFullYear() )
   		}       
    
    
    
           
       const prmont = function(){
        const d = new Date();
        console.log("Farhan")
        const date =d.getMonth()+1
        switch (date){
            case 1 :
                console.log("January")
                break
                case 2 :
                console.log("February")
                break
                case 3 :
                console.log("March")
                break
                case 4 :
                console.log("April")
                break
                case 5 :
                console.log("May")
                break
                case 6 :
                console.log("June")
                break
                case 7 :
                console.log("July")
                break
                case 8 :
                console.log("August")
                break
                case 9 :
                console.log("September")
                break
                case 10 :
                console.log("October")
                breakuar
                case 11 :
                console.log("November")
                break
                case 12 :
                console.log("December")
                break
            }
        }

        const getBatchInfo = function(){
            console.log("Roadon, Week 3rd Day 3rd, the topic for today is Nodejs module system")
        }
    
module.exports.pda = pdat
module.exports.pmont = prmont
module.exports.batch = getBatchInfo
