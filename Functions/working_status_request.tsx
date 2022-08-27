
export async function working_status_request (locationNow: String, workingStatus: String, onlineStatus: String) {

    
        
        // console.log("here we got")
        const function_name = "working_status_request"
        try{
            await fetch('http://192.168.0.6:5000/workingStatus', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            //  body: JSON.stringify({
            //   "name": "jae"
            // }),
             
            body: JSON.stringify({
                 "locationNow": locationNow,
                 "workingStatus" : workingStatus,
                 "onlineStatus" : onlineStatus
             })
    
          })
          .then((response) => response.json())
          .then((responseJson) => {
            
            if(responseJson.empty) {
               
            } else {
                console.log(`responsejson: ${JSON.stringify(responseJson[0])}`)
            }
            // console.log(`here is the response: ${responseJson}`)
          })

        } catch(error){
            console.log(`error in ${function_name}, ${error}`)
        } 
        

}