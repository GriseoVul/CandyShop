import Swal from "sweetalert2";

const prototipeToasts = Swal.mixin({
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
/**
 * @param {any} icon if 0 = "info"
 */
const Toast = (icon, title, load) => {
    if (load) {
        prototipeToasts.fire({
            icon: 'info',
            title: title,
            timer: undefined,
            didOpen: (toast) => {
                Swal.showLoading();
            }
        });
    } else {
        prototipeToasts.fire({icon: icon, title: title})
    }
}

export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "buttonOK",
        cancelButton: "button"
    },
    buttonsStyling: false,
    allowOutsideClick: false
});

export default Toast //icon = 0 as "info"