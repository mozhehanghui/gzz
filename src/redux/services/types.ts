export interface IFormDataParams {
  form_data: {
    [key: string]: string | number | undefined
    page?: number
    page_size?: number
  }
}
