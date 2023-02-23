import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from '@mui/material'

export interface ICommonDialog {
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
  ctitle: React.ReactNode | string
  ccontent: React.ReactNode | string
  cfooter: React.ReactNode | string
}

export const CommonDialog: React.FC<DialogProps & ICommonDialog> = ({
  open,
  ctitle,
  cfooter,
  ccontent,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      fullWidth
      disableEscapeKeyDown={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {ctitle}
      <DialogContent sx={{ pl: 6 }}>{ccontent}</DialogContent>
      <DialogActions sx={{ p: 2 }}>{cfooter}</DialogActions>
    </Dialog>
  )
}

export default CommonDialog
