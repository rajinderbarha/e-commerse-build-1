import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ProductContext } from "../store/productContext";
import Loader from "../ui/loader";
import CategoryTile from "../components/CategoryTile";


const categoryURL = 'https://api.escuelajs.co/api/v1/categories'
export default function CategoriesSceren() {
  // const ProdCtx = useContext(ProductContext);
  const [categories, setCategories] = useState([]);

// useEffect(() => {
// //   if(ProdCtx.products.length > 0){
// //     const categorieSet = new Set(ProdCtx.products.map((item) => item.category));
// //     const uniqueCategories = Array.from(categorieSet);
// //     setCategories(uniqueCategories)

// //   }
// // }, [ProdCtx.products]);


// if (ProdCtx.products.length > 0) {
//   const categoryMap = ProdCtx.products.reduce((acc, item) => {
//     if (!acc[item.category.id]) {
//       acc[item.category.id] = item.category;
//     }
//     return acc;
//   }, {});
//   const uniqueCategories = Object.values(categoryMap);
//   setCategories(uniqueCategories);
// }
// }, [ProdCtx.products]);


//   if(ProdCtx.isLoading){
//     return <Loader />
//   }






useEffect(() => {
  fetchCategories()
}, []);


 function fetchCategories(){
  fetch(categoryURL)
  .then((response)=>response.json())
  .then((categoryData)=>setCategories(categoryData))
  console.log('All categoires = ', categories)
}


  return (
    <FlatList 
      data={categories}
      numColumns={2}
      renderItem={({ item }) => <CategoryTile text={item.name} image={item.image} />} keyExtractor={(item)=> item.id}
    />
  
  );
  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22 ,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", 
    padding: 10,
  },
});