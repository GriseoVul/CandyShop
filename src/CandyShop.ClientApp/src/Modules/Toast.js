import Swal from "sweetalert2";

const prot =  Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
})

const Toast = (icon, title, load)=>{
if (load) {
  prot.fire({
    icon: 'info',
    title: 'Создание...',
    timer: undefined,
    didOpen: (toast) => {
        Swal.showLoading();
    }
});
} else {
  prot.fire({
    icon: icon,
    title: title
  })
}
}

export default Toast