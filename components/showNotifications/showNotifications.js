import { toast } from "react-toastify";

export default function showNotification(isError,message){
    console.log("dsdsds");
    if(isError){
        toast.error(`😣 ${message}!`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
    }else{
        toast.success(`😃 ${message}`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
    }
    
}