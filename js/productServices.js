export default class ProductServices{
    // search products
     async searchProduct(q,page,limit){
        const QueryParameters=new URLSearchParams({
            q:q,
            page:page,
            limit:limit
        })
      try {
        const response=await fetch(`https://nutriplan-api.vercel.app/api/products/search?${QueryParameters}`)
        if(!response.ok){
            throw new Error("err")
        }
        const data=await response.json();
        return data;
        
      } catch (error) {
        console.error(error);
        
      }

    }

    // search By Parcode
    async getProductByBarcode(barcode){
         try {
        const response=await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`)
        if(!response.ok){
            throw new Error("err")
        }
        const data=await response.json();
        return data;
        
      } catch (error) {
        console.error(error);
        
      }

    }
    // get all categories
    async getProductCategories(){
           try {
        const response=await fetch(`https://nutriplan-api.vercel.app/api/products/categories`)
        if(!response.ok){
            throw new Error("err")
        }
        const data=await response.json();
        return data;
        
      } catch (error) {
        console.error(error);
        
      }


    }
    // get product by category
    async getProductByCategory(category){
         try {
        const response=await fetch(`https://nutriplan-api.vercel.app/api/products/category/${category}`)
        if(!response.ok){
            throw new Error("err")
        }
        const data=await response.json();
        return data;
        
      } catch (error) {
        console.error(error);
        
      }


    }


}