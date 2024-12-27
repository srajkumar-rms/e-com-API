import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel{
  constructor( name, desc, price,  category,imageUrl, sizes,id){
      this.name = name;
      this.desc = desc;
      this.price = price;
      this.category = category;
      this.imageUrl = imageUrl;
      this.sizes = sizes;
      this._id = id;
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