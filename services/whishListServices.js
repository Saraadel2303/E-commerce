import axios from "axios";
import { Bounce, toast } from "react-toastify";



export async function addProductToWishlist(productId , setAddToWishlistLoading){
    setAddToWishlistLoading(true)
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist" , {productId} , {
      headers: {
        token : localStorage.getItem("token")
      }
    })
    setAddToWishlistLoading(false);
    toast.success(data.message  , {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    console.log(data)

  }

  export async function removeWishlistProduct( setremoveWhishlistLoading,refetch,productId) {
    setremoveWhishlistLoading(true)

    const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` ,  {
      headers: {
        token : localStorage.getItem("token")
      }
    })
    console.log(data)
    setremoveWhishlistLoading(false)
    refetch()

  }