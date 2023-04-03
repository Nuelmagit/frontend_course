export function userConfirmation({ title, text, icon }) {
  return this.$swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm'
  }).then(({ isConfirmed }) => isConfirmed);
}

export function userAlert( title, text, type ) {
  return this.$swal.fire(
    title,
    text,
    type
  )
}

export function toast(type, text) {
  return this.$swal
    .mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    .fire({
      icon: type,
      title: text,
    });
}