import axios from "axios";
import { Bounce, toast } from "react-toastify";



export async function addProductToCart(productId , setAddToCartLoading){
    setAddToCartLoading(true)
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {productId} , {
        headers:{
          token: localStorage.getItem("token")
        }
      } )
      setAddToCartLoading(false)
  
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
  
    }


   export async function getCart(setIsLoading , setCartID , setcartData , setNumberOfCartItems){
        setIsLoading(true)
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
          headers:{
            token: localStorage.getItem("token")
          }
        })
        setIsLoading(false)
        setCartID(data.cartId);
        setcartData(data.data);
        setNumberOfCartItems(data.numOfCartItems);
    
      }


     export async function removeCartProduct(productId ,setCartID , setcartData , setNumberOfCartItems , setIsLoading){
      setIsLoading(true)
          const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers:{
              token: localStorage.getItem("token")
            }
          })
          setCartID(data.cartId);
          setcartData(data.data);
          setNumberOfCartItems(data.numOfCartItems);
          setIsLoading(false)
      
        }


      export async function clearCart(setIsLoading , setCartID , setcartData , setNumberOfCartItems){
        setIsLoading(true)
          const {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart' , {
            headers:{
              token: localStorage.getItem("token")
            }
          })
          setCartID(null);
          setcartData(null);
          setNumberOfCartItems(0);
          setIsLoading(false)
      
        }


       export async function updateProductCount(productId , count ,cuurentCount ,  setcartData , setNumberOfCartItems , setIncrementLoading , setDecrementLoading){

        if (cuurentCount < count) {
          setIncrementLoading(true)
        }

        if (cuurentCount > count) {
          setDecrementLoading(true)
        }


            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count} , {
              headers:{
                token: localStorage.getItem("token")
              }
            })
            setIncrementLoading(false);
            setDecrementLoading(false)
            setcartData(data.data);
            setNumberOfCartItems(data.numOfCartItems);
        
            }