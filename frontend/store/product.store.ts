import { create } from "zustand";

import { Product } from "@/types/product.types";

import {
  getProducts,
} from "@/services/product.service";

interface ProductStore {

  products: Product[];

  loading: boolean;

  fetchProducts: (
    params?: any
  ) => Promise<void>;

}

export const useProductStore =
create<ProductStore>((set)=>({

products:[],

loading:false,

fetchProducts:async(params)=>{

try{

set({

loading:true

});

const res=
await getProducts(params);
console.log("API RESPONSE =>", res.data);

set({

products:
res.data.data.products,

loading:false,

});

}

catch{

set({

loading:false

});

}

}



}));


