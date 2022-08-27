
export async function online_status_request (onlineStatus: String) {

    
        
    // console.log("here we got")
    const function_name = "working_status_request"
    try{
        await fetch('http://192.168.0.6:5000/onlineStatus', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //  body: JSON.stringify({
        //   "name": "jae"
        // }),
         
        body: JSON.stringify({
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