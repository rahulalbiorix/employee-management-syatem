export default {
  required: (message: string) => {
    return (v: any) => !!v || `${message} Required`
  }
}
