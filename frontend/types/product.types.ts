export interface Category {
  _id: string;

  name: string;

  slug: string;
}

export interface Product {

_id:string;

title:string;

slug:string;

description:string;

price:number;

salePrice:number;

images:string[];

featured:boolean;

averageRating:number;

numReviews:number;

category:{

name:string;

slug:string;

image:string;

};

storeId?:{

name:string;

owner?:{

name:string;

avatar:string;

};

};

}