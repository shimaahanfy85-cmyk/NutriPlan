export default class MealServices{
    // get Random 25 Meals
    async getRandomMeals(){

    try {
        const response=await fetch("https://nutriplan-api.vercel.app/api/meals/random?count=25");
        if( !response.ok){
            throw new Error("error")
        }
         const data=await response.json();
         return data;
      
        
    } catch (error) {
        console.error(error)
        
    }
    

}
    // Search
    async searchMeals(searchTerm){
        try {
             const response=await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${searchTerm}&page=1&limit=25`)
             if(!response.ok){
                throw new Error("error")
             }
             const data=await response.json();
             return data;
            
            
        } catch (error) {
            console.error(error)
            
        }
        
    }

    // get All Gategories
    async getAllCategories(){
        try {
            const response= await fetch("https://nutriplan-api.vercel.app/api/meals/categories")
            if(!response.ok){
                throw new Error("err")
            }
            const data=await response.json();
            return data
            
        } catch (error) {
            console.error(error);
            
            
        }
    }

    // filter
    async filterMeals(type,value){
        try {
             const response=await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?${type}=${value}&page=1&limit=25`)
             if(!response.ok){
                throw new Error("error")
             }
             const data=await response.json();
             return data;
            
            
        } catch (error) {
            console.error(error)
            
        }
        
    }

    // get All Areas
    async getAllAreas(){
        try {
            const response= await fetch("https://nutriplan-api.vercel.app/api/meals/areas")
            if(!response.ok){
                throw new Error("err")
            }
            const data=await response.json();
            return data
            
        } catch (error) {
            console.error(error);
            
            
        }
    }
     // get meal by ID
     async getMealById(id){
         try {
             const response=await fetch(`https://nutriplan-api.vercel.app/api/meals/${id}`)
             if(!response.ok){
                throw new Error("error")
             }
             const data=await response.json();
             return data;
            
            
        } catch (error) {
            console.error(error)
            
        }
        
    }

    // Analyze recipe nutrition
    async Analyze_recipe_nutrition(recipeName,ingredients){
         try {
             const response=await fetch(`https://nutriplan-api.vercel.app/api/nutrition/analyze`,{
                method:"post",
                body:JSON.stringify({
                recipeName:recipeName,
                ingredients:ingredients  

                }),
                headers:{
                   "content-type":"application/json",
                   "x-api-key":"QMQjfTfTqDFWWCrccbb6qWf8Q8NprGmwqgzCzzTt"
                }
             })
             if(!response.ok){
                throw new Error(`Request failed: ${response.status}`);
             }
             const data=await response.json();
             console.log("nooooooooooooooor");
             
             console.log(data);
             return data;
             
            
            
        } catch (error) {
            console.error(error)
            
        }

    }


     }



