import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel{
  constructor(id, name, desc, price, imageUrl, category, sizes){
      this.id = id;
      this.name = name;
      this.desc = desc;
      this.price = price;
      this.imageUrl = imageUrl;
      this.category = category;
      this.sizes = sizes;
  }
  
  static add(product){
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static getAll(){
      return products;
  }

  static get(id){
    const product = products.find(i=> i.id == id)
    return product
  }

  static filter(minPrice, maxPrice, category){
    const result = products.filter((product) => {
      
        return (
        (product.price >= minPrice) &&
        (product.price <= maxPrice) &&
        (product.category == category)
      )
    })
    return result
  }

  static rateProduct(userID, productID, rating){
    //1. validate user and product
    
    const user = UserModel.getAll().find((u)=> u.id == userID)
    if(!user){
      //User defined error
      throw new ApplicationError("User not found", 404)
    }
    
    //Validate product
    const product = products.find(p=> p.id == productID)
    console.log(product);
    if(!product){
      throw new ApplicationError("Product not found", 400)
    }
    //2. check if they are any ratings 
    if(!product.ratings){
      product.ratings = []
      product.ratings.push({userID: userID, ratings: rating})
    }
      //check if user rating is already available
      const existingRatingIndex = product.ratings.findIndex(r=> r.userID == userID)
    
    if(existingRatingIndex >= 0){
      product.ratings[existingRatingIndex] = {
        userID: userID,
        rating: rating
      }

      }else{
        // If no existing rating then add new rating
        product.ratings.push({userID: userID, ratings: rating})
      }
    }
  }


var products = [
  new ProductModel(
    1,
    'Product 1',
    'Description for Product 1',
    19,
    'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    'Category1',
    ['S']
  ),
  new ProductModel(
    2,
    'Product 2',
    'Description for Product 2',
    29,
    'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    'Category2',
    ['M', 'XL']
  ),
  new ProductModel(
    3,
    'Product 3',
    'Description for Product 3',
    39,
    'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    'Category3',
    ['M', 'XL','S']
  )];